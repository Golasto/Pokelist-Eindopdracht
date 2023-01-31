import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

export const LoginForm = (props) => {

    const [ name, setName ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

    const { login } = useContext( AuthContext )

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                name: name,
                password: password,
            })
            login( response.data.accessToken )
        } catch ( e ) {
            console.error( e )
        }
    }

    return (
        <main className="login-container">
            <h1>Login</h1>
            <form onSubmit={ handleLogin } className="login">
                <label form="name">Name</label>
                <input placeholder="Naam" type="name" value={ name } onChange={ e => setName( e.target.value ) } id="name"/>
                <label form="password">Password</label>
                <input placeholder="Password" type="password" value={ password } onChange={ e => setPassword( e.target.value ) } id="password"/>
                <button type="submit" className="form-button">Login</button>
            </form>
                <button className="form-button" onClick={() => props.onFormSwitch('register')}>Geen account? klik hier om te registreren!</button>
        </main>
    );
}

// export const LoginForm = (props) => {
//     const [name, setName] = useState("");
//     const [pass, setPass] = useState("");
//     const {login} = useContext(AuthContext)
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin",{
//                 username: name,
//                 password: pass,
//             })
//             localStorage.setItem("key", response.data.accessToken)
//             console.log(response)
//             login()
//             props.onFormSwitch('logout')
//         } catch (e) {
//             console.error(e.response)
//             alert(e.response.data)
//         }
//     }
//     return (
//         <>
//             <div className="login-container">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit} className="login">
//                     <label form="name">Name</label>
//                     <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"/>
//                     <label form="password">Password</label>
//                     <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
//                     {/* eslint-disable-next-line no-unused-expressions */}
//                     <button className="form-button" type="submit" /*onClick={() => {loginName()}}*/>Log in</button>
//                 </form>
//                 <button className="form-button" onClick={() => props.onFormSwitch('register')}>Geen account? klik hier om te registreren!</button>
//             </div>
//         </>
//     )
// }