import React, {useContext, useState,} from 'react';
import {AuthContext} from "../context/authProvider";
import {useNavigate} from "react-router-dom";

export const Logoutform = (props) => {
    const data = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <>
                <button className="logout-button" onClick={() => {props.onFormSwitch('login'); data.logout(); navigate('../') }}>Logout!</button>

        </>
    )
}