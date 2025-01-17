import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

// eslint-disable-next-line
import cl from './LoginPage.module.css'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  // /login
  // Страница авторизации пользователя 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {loginUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(username.length > 0 && loginUser(username, password))){
      setError('Invalid username or password');
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={error ? 'errorInput' : ''}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? 'errorInput' : ''}
        />
      </div>
      {error && <p className={'errorText'}>{error}</p>}
      <p>New to Books? <Link to={'/register'}>Register</Link></p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
