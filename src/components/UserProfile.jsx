import { useContext } from "react";
import AuthContext  from "../context/AuthContext";


const UserProfile = () => {

    const {user} = useContext(AuthContext);

    return (
        <div className="container">
            <p>Welcome: {user?.username}</p>
        </div>
    )
}

export default UserProfile;