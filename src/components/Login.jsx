import { useState } from "react";
import '../App.css';


const Login = () => {

    const loginData = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(loginData);

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prev) => ({...prev, [name]:value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("formData>>>>> ", formData);

        try {
            const response = await fetch("/account/login/", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok){
                throw new Error(`HTTP Error is: ${response.status}`)
            }

            const result = await response.json();
            console.log("result is: ", result);
            setFormData(loginData)
            setErrors({})
        }
        catch (error){

        }


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
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleInputChange}
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
