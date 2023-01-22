import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginForm} from "./loginForm";


const Nav = ({isAuthenticated, toggleIsAuthenticated}) => {

    const navigate = useNavigate()

    function handleLogin() {
        toggleIsAuthenticated( true )
        navigate("../pages/home")
    }
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li className="navlist"><Link to="/" className='navbutton'>Home</Link></li>
                    { isAuthenticated && <li className="navlist"><Link to="/search" className='navbutton'>Search</Link></li>}
                    { isAuthenticated && <li className="navlist"><Link to="/favorite" className='navbutton'>Favorite</Link></li>}
                    { isAuthenticated && <li className="navlist"><Link to="/list-download" className='navbutton'>List-Download</Link></li>}
                </ul>
                <div>
                    <button type="button" onClick={ () => {toggleIsAuthenticated(false)} }>Logout</button>
                    <button type="button" onClick={handleLogin}>Login</button>
                </div>
            </nav>
        </>
    )
}
export default Nav