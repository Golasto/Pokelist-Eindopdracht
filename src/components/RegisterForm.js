import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const RegisterForm = (props) => {
    const [ email, setEmail ] = useState( "" )
    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

    const { login } = useContext( AuthContext )

    async function registerUser(e) {
        e.preventDefault()
        console.log( "De gebruiker is geregistreerd 👤" )
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',{
                email: email,
                username: username,
                password: password,
            })
            login( response.data.accessToken )
        } catch ( e ) {
            console.error( e )
        }
    }

    return (
        <main className="register-container">
            <h1>Registreren</h1>
            <form onSubmit={ registerUser } className="register">
                <label form="name">Name</label>
                <input placeholder="Username" type="text" value={ username } id="name" onChange={ e => setUsername( e.target.value ) }/>
                <label form="email">Email</label>
                <input placeholder="Email" type="email" value={ email } id="email" onChange={ e => setEmail( e.target.value ) }/>
                <label form="password">Password</label>
                <input placeholder="Password" type="password" value={ password } id="password" onChange={ e => setPassword( e.target.value ) }/>
                <button type="submit" className="form-button">Sign Up</button>
            </form>
            <button className="form-button" onClick={() => props.onFormSwitch('login')}>Heb je al een account? klik hier om in te loggen!</button>
        </main>
    );
}


// export const RegisterForm = (props) => {
//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");
//     const [name, setName] = useState("");
//     const { login } = useContext(AuthContext)
//     const navigate = useNavigate()
//
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup",{
//                 email: email,
//                 password: pass,
//                 username: name,
//                 role: ['user']
//             })
//
//             localStorage.setItem("key", response.data.accessToken)
//             navigate("login")
//             login()
//             console.log(response)
//             props.onFormSwitch('logout')
//             navigate("../")
//         } catch (e){
//             console.log(e.response)
//             alert(e.response.data)
//         }
//
//     }
//
//     return (
//         <>
//             <div className="register-container">
//                 <h1>Register</h1>
//                 <form onSubmit={handleSubmit} className="register">
//                     <label form="name">Name</label>
//                     <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"/>
//                     <label form="email">Email</label>
//                     <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
//                     <label form="password">Password</label>
//                     <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
//                     <button className="form-button" type="submit">Register</button>
//                 </form>
//                 <button className="form-button" onClick={() => props.onFormSwitch('login')}>Heb je al een account? klik hier om in te loggen!</button>
//             </div>
//         </>
//     )
// }