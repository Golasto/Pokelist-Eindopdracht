import React, { useState, useContext } from 'react';
import axios from "axios";
import {AuthContext} from "../context/authProvider";
import {useNavigate} from "react-router-dom";

export const RegisterForm = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup",{
                email: email,
                password: pass,
                username: name,
                role: ['user']
            })

            localStorage.setItem("key", response.data.accessToken)
            navigate("login")
            login()
            console.log(response)
            props.onFormSwitch('logout')
            navigate("../")
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
            <label form="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"/>
            <label form="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label form="password">Password</label>
            <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button className="form-button" type="submit">Register</button>
        </form>
        <button className="form-button" onClick={() => props.onFormSwitch('login')}>Heb je al een account? klik hier om in te loggen!</button>
            </div>
        </>
    )
}