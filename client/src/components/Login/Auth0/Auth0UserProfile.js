import React from "react";
import  { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

    const { user, isAuthenticated, isLoading } = useAuth0()

    console.log('Authenticated ? ', isAuthenticated)
    if(isLoading) {
        return <div> Loading ... </div>
    }

    // if(!isAuthenticated) {
    //     return <div> User not authenticated by Auth0 </div>
    // }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p> { user.email} </p>
            </div>
        )
    )
}

export default Profile