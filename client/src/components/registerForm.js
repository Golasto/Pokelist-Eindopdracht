import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/authProvider";

export const RegisterForm = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const value = useContext(AuthContext)

    const handleSubmit = async (e) => {
        const data = {
            email: email,
            password: pass,
            username: name,
        }
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/register", data)
            value.login()
            props.onFormSwitch('logout')
        } catch (e){
            console.log(e.response)
            alert(e.response.data)
        }

    }

    return (
        <>
            <div className="register-container">
                <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register">
            <label form="name">name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"/>
            <label form="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label form="password">password</label>
            <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button className="form-button" type="submit">Register</button>
        </form>
        <button className="form-button" onClick={() => props.onFormSwitch('login')}>Heb je al een account? klik hier om in te loggen!</button>
            </div>
        </>
    )
}