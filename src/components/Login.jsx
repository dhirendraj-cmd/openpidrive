import { useState } from "react";


const Login = () => {

    return (
        <div>
            <label htmlFor="login">
                <b>Login</b>
            </label>
            <br/>
            <br/>

            <label htmlFor="username">
                <b>Username: </b>
                <input type="text" name="username" placeholder="Enter Username"/>
            </label>
            <br/>
            <br/>

            <label htmlFor="password">
                <b>Password: </b>
                <input type="password" name="password" placeholder="Enter password"/>
            </label>
        </div>
    )

}

export default Login
