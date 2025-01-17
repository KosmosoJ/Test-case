import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../ui/Loader/Loader';
import cl from './books.module.css'
import AuthContext from '../../context/AuthContext';
import axios from 'axios'

const BookDetail = () => {
  // Детальный просмотр информации о книге по /books/{id}
  // Также здесь реализована возможность редактирования информации о книге, только авторизованным пользователям.
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const history = useNavigate()
    const {authTokens} = useContext(AuthContext)
    const token = authTokens.token.replace('"','').replace('"','')

    const handleDelete =(bookId) =>{
      if (window.confirm('Are you sure to delete this book?')){
        axios.delete(`http://localhost:8000/api/books/${bookId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })
        history('/')
      }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:8000/api/books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <Loader/>;
    if ('detail' in book){
      return (
        <div className={cl.book_detail}>
          <h1>Book not found</h1>
        </div>
      )
      
    }

    return (
    <div className={cl.book_detail}>
      <div>
      <h1>{book.name}</h1>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Написана</strong> <Link to={`/bookbyauthor/${book.author}`} style={{textDecoration:'none'}}>{book.author_name}</Link> </p>
      </div>
      <div className={cl.booksBtns}>
      {user ? <Link to={`/editbook/${book.id}`}><button>Edit book</button></Link>: ''}
      {user ? (
        <button onClick={() => handleDelete(book.id)}>
          Delete book
        </button>
      ) : ''}
      </div>
    </div>
  );
};

export default BookDetail;