import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../ui/Loader/Loader';
import cl from '../Books/books.module.css'


const AuthorBooksList = () => {
  // /bookbyauthor
  // Вывод книг в с фильтрацией по автору 
  const [books, setBooks] = useState([]);
  const [isLoading, setIsloading] = useState(true)
  
  const {id} = useParams()

  useEffect(() => {
    
    axios.get(`http://localhost:8000/api/bookbyauthor/${id}`)
      .then(response => {
        setBooks(response.data);
        setIsloading(false)
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, [id]);

  if (isLoading){
    return(<Loader/>)
  }

  if (books.length === 0 && !isLoading){
    return(
        <div className='books-list d-flex mx-auto'>
            <span>Books not found :'(</span>
        </div>
    )
  }

  return (
    <div>
      <h3>Books by {books[0]['author_name']}</h3>
    <div className="books-list d-flex justify-content-center mx-auto flex-wrap w-100 mt-3 gap-5 ">
      
      {books.map(book => (
        <Link to={`/books/${book.id}`} className='clear_link'>
        <div key={book.id} className={cl.book_item}>
          <h4> {book.name}</h4>
          {book.description.length > 50 ? 
          <p>{`${book.description.substring(0, 50)}...`}</p>
          : <p>{`${book.description}`}</p>}
          
        </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default AuthorBooksList;