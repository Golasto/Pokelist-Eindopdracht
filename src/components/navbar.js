import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/authProvider"

const Nav = () => {

    const data = useContext(AuthContext)

    return (
        <>
            <nav className="navbar">
                <ul>
                    <li className="navlist"><Link to="/" className='navbutton'>Home</Link></li>
                    { data.isAuth.isAuth && <li className="navlist"><Link to="/search" className='navbutton'>Search</Link></li>}
                    { data.isAuth.isAuth && <li className="navlist"><Link to="/favorite" className='navbutton'>Favorite</Link></li>}
                    { data.isAuth.isAuth && <li className="navlist"><Link to="/list-download" className='navbutton'>List-Download</Link></li>}
                </ul>
            </nav>
        </>
    )
}
export default Nav