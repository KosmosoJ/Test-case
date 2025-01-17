import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/ui/NavBar/NavBar';
import BookDetail from './components/Books/BookDetail';
import BooksList from './components/Books/BooksList';
import LoginPage from './components/LoginPage/LoginPage';
import AuthorBooksList from './components/Author/Author';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile/Profile'
import ProtectedRoute from './utils/PrivateRoute';
import AddBook from './components/Books/AddBook';
import BookEdit from './components/Books/BookEdit';
import RegisterPage from './components/LoginPage/RegisterPage';




function App() {
  return (
      <Router>
        <AuthProvider>
          <div className="App">
            <NavBar/>
            <div className='container'>
            <Routes>
                <Route exact path="/" element={<BooksList/>} />
                <Route path="/books/:id" element={<BookDetail/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/bookbyauthor/:id" element={<AuthorBooksList/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/me" element={
                  <ProtectedRoute>
                  <Profile/>
                  </ProtectedRoute>
                  } />
                <Route path='/addbook' element={
                  <ProtectedRoute>
                  <AddBook/>
                  </ProtectedRoute>
                  }/>
                <Route path='/editbook/:book_id' element={
                  <ProtectedRoute>
                  <BookEdit/>
                  </ProtectedRoute>
                  }/>
            </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
