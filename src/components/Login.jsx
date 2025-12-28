import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import '../App.css';


const Login = () => {

    const [credentials, setCredentials] = useState({username:'', password:''})
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting...");
        login(credentials, navigate);
    }

    return (
        <div className="main-login-container">
          <form onSubmit={handleSubmit} className="auth-form-box">
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </label>

            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </label>

            <div className="submitbtn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
);

}

export default Login
