import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/authProvider";

export const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const value = useContext(AuthContext)

    const handleSubmit = async (e) => {

    const data = {
        email: email,
        password: pass,
    }
    e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", data)
            value.login()
            localStorage.setItem("key", response.data.accessToken)
            props.onFormSwitch('logout')
        } catch (e) {
            console.error(e.response)
            alert(e.response.data)
        }
    }
    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login">
            <label form="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label form="password">Password</label>
            <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button className="form-button" type="submit">Log in</button>
        </form>
            <button className="form-button" onClick={() => props.onFormSwitch('register')}>Geen account? klik hier om te registreren!</button>
            </div>
        </>
    )
}