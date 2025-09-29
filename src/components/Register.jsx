import { useState } from "react";


const Register = () => {

    return (
        <div>
            <label htmlFor="register">
                <b>Register</b>
            </label>
            <br/>
            <br/>

            <label htmlFor="name">
                <b>Name: </b>
                <input type="text" name="name" placeholder="Enter Name"/>
            </label>
            <br/>
            <br/>
            <label htmlFor="email">
                <b>Email: </b>
                <input type="email" name="email" placeholder="Enter Email"/>
            </label>
            <br/>
            <br/>
            <label htmlFor="username">
                <b>Username: </b>
                <input type="text" name="username" placeholder="Username should for min 3 characters"/>
            </label>
            <br/>
            <br/>
            <label htmlFor="password">
                <b>Password: </b>
                <input type="password" name="password" placeholder="Enter Password"/>
            </label>
            <br/>
            <br/>

            <button type="submit">Signup</button>

        </div>
    )

}

export default Register
