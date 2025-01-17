import {createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? localStorage.getItem("authTokens")
            : null
    );


    const [loading, setLoading] = useState(true);

    const history = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'username':username, 'password':password
            })
        })
        const data = await response.json()

        if(response.status === 200){
            console.log("Logged In");
            setAuthTokens(data)
            delete data.user.password
            setUser(data.user)
            localStorage.setItem("authTokens", JSON.stringify(data))
            history('/')
            

        } else {    
            console.log(response.status);
            console.log("there was a server issue");
        }
    }

    const registerUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'username':username, 'password':password
            })
        })
        if(response.status === 200){
            history("/login")

        } else {
            console.log(response.status);
            console.log("there was a server issue");
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history("/login")
    }

    const updateAuthTokens = (data) => {
        console.log('Мы внутри', data)
        setAuthTokens(data)
        console.log(authTokens)
        localStorage.setItem("authTokens", JSON.stringify(data))
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        updateAuthTokens,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(authTokens.user)
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}