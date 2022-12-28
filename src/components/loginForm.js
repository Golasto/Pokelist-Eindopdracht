import React, { useState } from 'react';

export const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label form="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label form="password">password</label>
            <input value={pass}  onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Log in</button>
        </form>
            <button onClick={() => props.onFormSwitch('register')}>Geen account? klik hier om te registreren!</button>
        </>
    )
}