import { NavLink, Link } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {

    return (
        <div>
            <nav>
                <div>
                    <ul>
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
