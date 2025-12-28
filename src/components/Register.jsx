import { useState } from "react";
import * as Yup from "yup";
import '../App.css';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const userData = {
        name: "",
        email: "",
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(userData)

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required!"),
        email: Yup.string().email("Invalid Email").required("Email is required!"),
        username: Yup.string().min(3, "Username must me at least 3 characters long!").required("Username is Required"),
        password: Yup.string()
                    .min(8, "Password must be at least 8 characters").required("Password is Required")
                    .matches(/[!@#$%^&*()]/, "Passowrd must at least include one special character from !@#$%^&*()")
                    .matches(/[0-9]/, "Password must contain at least on number")
                    .matches(/[A-Z]/, "Password must contain atleast one uppercase letter")
                    .matches(/[a-z]/, "Password must contain atleast one lowercase letter")
    })

    const handleInputChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]:value}));

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData, typeof(formData))

        try {
            await validationSchema.validate(formData, {abortEarly: false});
            console.log("Submitted!>>>>>")

            // <YOUR_API_ENDPOINT>

            const response = await fetch("http://localhost:8000/account/register/", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error is: ${response.status}, Message: ${JSON.stringify(errorData)}`)
            }

            const jsonData = await response.json();
            console.log("jsondata is >> : ", jsonData);

            if (response.status == 200){
                alert("User Successfully Registered!!!");
                navigate("/login");
            }

            setFormData(userData);
            setErrors({})

        } catch (error) {
            console.log(error.inner);
            console.log("Error after submitting is : ", error, typeof(error));
            
            if (error.inner){
                const newErrors = {}

                error.inner?.forEach((err) => {
                    newErrors[err.path] = err.message;
                })
                setErrors(newErrors);
            } else {
                console.error("API call failed:", error.message);
            }
        }


    }
    

    return (
            <div className="main-register-container">
                <form onSubmit={handleFormSubmit} className="auth-form-box">
                        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>
                        <label htmlFor="name">
                            Name:
                            <input type="text" className="name-field" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInputChange}/>
                            {errors?.name && <div className="error">{errors?.name}</div>}
                        </label>
                        <br/>
                        <br/>
                        <label htmlFor="email">
                            Email:
                            <input type="email" className="email-field" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange}/>
                            {errors?.email && <div className="error">{errors?.email}</div>}
                        </label>
                        <br/>
                        <br/>
                        <label htmlFor="username">
                            Username:
                            <input type="text" className='username-field' name="username" placeholder="Username should be of min 3 characters" value={formData.username} onChange={handleInputChange}/>
                            {errors?.username && <div className="error">{errors?.username}</div>}
                        </label>
                        <br/>
                        <br/>
                        <label htmlFor="password">
                            Password:
                            <input type="password" className='pwd-field' name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange}/>
                            {errors?.password && <div className="error">{errors?.password}</div>}
                        </label>
                        <br/>
                        <br/>

                        <div className="submitbtn" >
                            <button type="submit">Sign Up</button>
                        </div>

                </form>
            </div>
    )

}

export default Register
