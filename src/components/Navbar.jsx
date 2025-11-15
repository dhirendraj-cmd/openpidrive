import '../App.css';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <nav className="nav-contents">

                <ul className="unordered">
                    <li>
                        <NavLink to="/">OpenPiDrive</NavLink>
                    </li>

                    {user && (
                        <li>
                            <NavLink to="/upload">UploadFiles</NavLink>
                        </li>
                    )}
                </ul>

                <div className="auth-links">
                    {user ? (
                        <>
                            <li>
                                <NavLink to="/user"><span className="welcome-text">{user.username}</span></NavLink>
                            </li>
                            <button onClick={logout} className="btn btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="btn btn-login">Login</NavLink>
                            <NavLink to="/register" className="btn btn-register">Register</NavLink>
                        </>
                    )}
                </div>

            </nav>
        </div>
    )
}

export default Navbar;
