import React, {useContext, useState,} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const Logoutform = (props) => {
    const data = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <>
            <button className="logout-button" onClick={() => {props.onFormSwitch('login'); navigate("/"); data.logout() }}>Logout!</button>

        </>
    )
}