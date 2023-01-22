import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/authProvider";

export const LoginForm = (props) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const value = useContext(AuthContext)


    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin",{
                username: name,
                password: pass,
            })
            localStorage.setItem("key", response.data.accessToken)
            console.log(response)
            value.login()
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
            <label form="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"/>
            <label form="password">Password</label>
            <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button className="form-button" type="submit">Log in</button>
        </form>
            <button className="form-button" onClick={() => props.onFormSwitch('register')}>Geen account? klik hier om te registreren!</button>
            </div>
        </>
    )
}