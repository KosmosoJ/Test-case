import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import cl from './Profile.module.css'

const Profile = () =>{
    // Отображение инфорамции о пользователе на странице /me
    // Если пользователь не авторизован - автоматическая переадресация на /login
    const {user, logoutUser, authTokens, updateAuthTokens} = useContext(AuthContext)
    const [error, setError] = useState('')
    const [token, setToken] = useState(authTokens.token.replace('"', '').replace('"','')) // Токен достается из сторага с кавычками, из-за которых падает запрос, максимально всратое решение, но по другому не получилось :'(
    if (user){
        var username = user['username']
        var email = user['email']
    } 
    const [newEmail, setNewEmail] = useState(email)

    const handlePatch = async () => {
        const response = await fetch(`http://localhost:8000/api/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ email: newEmail, id:user['id'] }) 
        })

        if (response.ok) {
            var data = await response.json()
            delete data['user']['password']
            console.log(data)
            updateAuthTokens(data)
            setToken(authTokens.token.replace('"', '').replace('"',''))
            
        } else if (response.status === 404){
            setError('Enter valid email')
        }
        
    }

    return (
        <div>
            <h2>Profile</h2>
            <span>Hello,  <strong>{username}</strong></span>
            <div>
            <label>Email</label>
            <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder='New email'
                className={error ? 'errorInput' : ''}
            />
            {error && <p className={'errorText'}>{error}</p>}

            <div className={cl.profileBtns}>
            <button onClick={handlePatch}>Update Profile</button>
            
            <button onClick={logoutUser}>Logout</button>
            </div>
            </div>
        </div>
    )
}

export default Profile