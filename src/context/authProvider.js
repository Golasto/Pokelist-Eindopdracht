import React, { createContext, useState, useEffect } from 'react';
import  axios  from "axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: null,
            email: null,
        }
    });

    const [isLoaded, setIsLoaded] = useState(false)
    const key = localStorage.getItem('key')

    function login() {
        console.log('Gebruiker is ingelogd!');
        toggleIsAuth({isAuth: true});
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.setItem("key","")
        toggleIsAuth({isAuth: false, user: {username: null, password: null}});
    }

    async function getData() {
        const decripted_key = jwt_decode(key);
        const data = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + key,
            }
        }
        try {
            const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/auth/user" + decripted_key.sub, data, {withCredentials: false})
            toggleIsAuth({ username: response.data.username, email: response.data.email, isAuth: true })
            console.log(response.data)
            setIsLoaded(true)
        } catch (e) {
            console.error(e.response)
            setIsLoaded(true)
        }
    }

    const contextData = {
        isAuth: isAuth,
        login: login,
        logout: logout,
        getData: getData,
    };

    useEffect(() => {
        if (key !== "" && key !== null)  {
            getData();
        } else {
            setIsLoaded(true)
        }
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>
    } if (isLoaded) {
        return (
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;