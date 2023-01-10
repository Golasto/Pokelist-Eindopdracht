import React, {useContext, useState,} from 'react';
import {AuthContext} from "../context/authProvider";

export const Logoutform = (props) => {
    const data = useContext(AuthContext)
    return (
        <>
                <button className="form-button" onClick={() => {props.onFormSwitch('login'); data.logout() }}>Loguit!</button>
        </>
    )
}