// import React, { createContext, useState, useEffect } from 'react';
// import  axios  from "axios";
// import jwt_decode from "jwt-decode";
//
// export const AuthContext = createContext({});
//
// function AuthContextProvider({ children }) {
//     const [auth, toggleAuth] = useState({
//         isAuth: false,
//         user: {
//             username: null,
//             email: null,
//         }
//     });
// useEffect(()=> {
//
// }, [])
//
//
//     const [isLoaded, setIsLoaded] = useState(false)
//     const key = localStorage.getItem('key')
//
//     function login() {
//         console.log('Gebruiker is ingelogd!');
//         toggleAuth({isAuth: true});
//     }
//
//     function logout() {
//         console.log('Gebruiker is uitgelogd!');
//         localStorage.setItem("key","")
//         toggleAuth({isAuth: false, user: {username: null, password: null}});
//     }
//
//     async function getData() {
//         const token = localStorage.getItem("key")
//
//
//         try {
//             const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user",
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`,
//                     }
//                 })
//
//             if (token) {
//                 const decoded = jwt_decode(token);
//                 AuthContextProvider(decoded.sub, token);
//             } else {
//                 toggleAuth({
//                     isAuth: false,
//                     user: null,
//                 });
//             }
//             toggleAuth({ username: response.data.username, email: response.data.email, isAuth: true })
//             console.log(response.data)
//             setIsLoaded(true)
//         } catch (e) {
//             console.error(e.response)
//             setIsLoaded(true)
//         }
//     }
//
//     const contextData = {
//         isAuth: auth,
//         login: login,
//         logout: logout,
//         //getData: getData,
//     };
//
//     /*useEffect(() => {
//         if (key !== "" && key !== null)  {
//             getData();
//         } else {
//             setIsLoaded(true)
//         }
//     }, []) */
//
//     //if (!isLoaded) {
//        // return <div>Loading...</div>
//     //} if (isLoaded) {
//         return (
//             <AuthContext.Provider value={contextData}>
//                 {children}
//             </AuthContext.Provider>
//         );
//     //}
// }
//
// export default AuthContextProvider;