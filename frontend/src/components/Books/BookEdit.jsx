import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorSelect from '../Author/AuthorSelect';
import AuthContext from '../../context/AuthContext';

const BookEdit = ({ match }) => {
    // Редактирование информации о книге
  const [book, setBook] = useState({ name: '', description: '' });
  const {book_id} = useParams()
  const {authTokens} = useContext(AuthContext)
  // eslint-disable-next-line
  const [token, setToken] = useState(authTokens.token.replace('"', '').replace('"',''));
  
  const history = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:8000/api/books/${book_id}/`);
      setBook(response.data);
    };
    fetchBook();
  }, [book_id]);

  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.name || !book.description || !e.target.author.value) return alert('Have to input something');
    let body = {'name':book.name, 'description':book.description, 'author':e.target.author.value}
    console.log(body)
    await axios.put(`http://localhost:8000/api/books/${book_id}/`, body, {
    headers: {
        'Authorization': `Token ${token}`
    }
});
    history(`/books/${book_id}`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Book name</label>
      <input
        type="text"
        name="name"
        value={book.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <label>Book description</label>
      <input
        type="text"
        name="description"
        value={book.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <AuthorSelect/>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default BookEdit;
