import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";


const NavBar = () => {

    const {user} = useContext(AuthContext)
    return(
        <nav className="navbar border-bottom">
        <div className="container-fluid w-50" >
            <Link to={'/'} className="navbar-brand">
            <span style={{fontWeight:'bold'}}>Books</span>
            </Link>
            {user ? <Link to='/addbook' className="navbar-brand">Add book </Link> : ''}
            {user ? <Link to={'/me'} className="navbar-brand">Profile</Link>:
            <Link to={'/login'} className="navbar-brand" href="login">
            Login
            </Link>}
            
        </div>
        
        </nav>
    )
}

export default NavBar