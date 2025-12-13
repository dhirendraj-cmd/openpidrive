import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosInstance";


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            getCurrentUserData();
        } else {
            setLoading(false);
        }
    }, [])


    const getCurrentUserData = async () => {
        try{
            const response = await api.get("/account/me/");
            console.log("user data", response.data, response.data.username);
            console.log("username data", response.data.username);
            setUser(response.data)
        } catch (error) {
            console.log("USER ERROR >>>>>>>> ", error)
        } finally {
            setLoading(false);
        }
    }


    const login = async (credentials, navigate) => {
        setLoading(true)

        try {
            const response = await api.post("/account/login/", credentials);

            console.log("login res data>>>>>>>> ", response, response.data);
            
            const {access_token} = response.data
            localStorage.setItem('token', access_token);

            // set header onces token is fetched
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            await getCurrentUserData();
            navigate('/');
            
        } catch (error) {
            console.log("LOGIN ERROR >>>>>>>> ", error)
            console.log("resonse  ERROR >>>>>>>> ", error.response.status)

            if (error.response.status == 401){
                console.log("detail>>>>>", error.response.data.detail)
                alert("Username or Password is incorrect");
            }
        } finally {
            setLoading(false);
        }
    }


    const logout = async () => {
        try {
            // revoke and delete refresh token from cookie from backend
            await api.post("/account/logout/", {}, {
                withCredentials: true
            })
        } catch (error ){

            console.error("Logout request failed:", error);
        } finally {
            // clear token from local stroage
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            setUser(null)
        }
    }



    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
