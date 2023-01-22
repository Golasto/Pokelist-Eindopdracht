import React, { useState } from 'react';

export const RegisterForm = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name: " + name)
        console.log("email: " + email)
        console.log("password: " + pass)
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