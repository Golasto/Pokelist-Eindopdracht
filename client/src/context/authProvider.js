import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });

    function login() {
        console.log('Gebruiker is ingelogd!');
        toggleIsAuth({isAuth: true});
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleIsAuth({isAuth: false});
    }


    const contextData = {
        isAuth: isAuth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;