import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import '../App.css';


const Navbar = () => {

    return (
        <div className="navbar">
            <nav className="nav-contents">
                <div className="header">
                    <ul className="unordered">
                        <li>
                            <NavLink to="/">
                                OpenPiDrive
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="auth-links">
                    <NavLink to="/login" className="btn btn-login">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-register">
                        Register
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
