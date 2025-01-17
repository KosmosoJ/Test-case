import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthorSelect from "../Author/AuthorSelect";


const AddBook = () => {
    // Добавление книг. Доступно только авторизированным пользователям
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { authTokens } = useContext(AuthContext);
  // eslint-disable-next-line
  const [token, setToken] = useState(authTokens.token.replace('"', '').replace('"',''));
  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !e.target.author.value) return alert('Have to input something');
    const body = { 'name': name, 'description': description, 'author': e.target.author.value };
    console.log(body)
    await fetch("http://localhost:8000/api/books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
    history('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Input book name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          placeholder="Input book description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <AuthorSelect/>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
