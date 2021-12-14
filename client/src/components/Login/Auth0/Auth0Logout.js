import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button, Grid} from "@mui/material";


const Auth0Logout = () => {

    const { logout } = useAuth0()

    return (
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div>
                <Button
                    variant={"contained"}
                    disableElevation
                    onClick={() => logout({ returnTo: window.location.origin})}
                >
                    Auth0 Login
                </Button>
            </div>
        </Grid>
    )
}

export default Auth0Logout