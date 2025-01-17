import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
// eslint-disable-next-line
import cl from './LoginPage.module.css';

const RegisterPage = () => {
    // /register
    // Страница регистрации пользователя
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.pass1.value === e.target.pass2.value){
        try {
        registerUser(username, password, confirmPassword);
        } catch (error) {
        setError(error.message);
        }
    } else{
        setError('Passwords do not match')
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={error ? 'errorInput' : ''}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          id='pass1'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? 'errorInput' : ''}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          id='pass2'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={error ? 'errorInput' : ''}
          required
        />
      </div>
      {error && <p className={'errorText'}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;