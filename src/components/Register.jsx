import { useState } from "react";
import * as Yup from "yup";


const Register = () => {

    const userData = {
        name: "",
        email: "",
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(userData)

    const [errors, setErrors] = useState()

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

        console.log(formData, typeof(formData));

        try {
            await validationSchema.validate(formData, {abortEarly: false});
            console.log("Submitted!", formData)

            // http://localhost:8000/

            const response = await fetch("", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error(`HTTP Error is: ${response.status}`)
            }

            const result = await response.json();
            console.log("result is: ", result);
            setFormData(userData);
            setErrors({})

        } catch (error) {
            console.log(error.inner);
            console.log("Error after submission: ", error);
            const newErrors = {}

            error.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            })

            setErrors(newErrors);
        }



    }
    

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="register">
                    <p>Register</p>
                </label>
                <br/>
                <br/>

                <label htmlFor="name">
                    Name:
                    <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInputChange}/>
                    {errors?.name && <div className="error">{errors?.name}</div>}
                </label>
                <br/>
                <br/>
                <label htmlFor="email">
                    Email:
                    <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange}/>
                    {errors?.email && <div className="error">{errors?.email}</div>}
                </label>
                <br/>
                <br/>
                <label htmlFor="username">
                    Username:
                    <input type="text" name="username" placeholder="Username should for min 3 characters" value={formData.username} onChange={handleInputChange}/>
                    {errors?.username && <div className="error">{errors?.username}</div>}
                </label>
                <br/>
                <br/>
                <label htmlFor="password">
                    Password:
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange}/>
                    {errors?.password && <div className="error">{errors?.password}</div>}
                </label>
                <br/>
                <br/>

                <div className="submitbtn">
                    <button type="submit">Sign Up</button>
                </div>

            </div>
        </form>
    )

}

export default Register
