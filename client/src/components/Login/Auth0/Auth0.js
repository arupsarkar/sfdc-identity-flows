import React from 'react';
import styles from './Auth0.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Grid} from "@mui/material";

const Auth0 = () => {

    const { loginWithRedirect } = useAuth0()

    return(
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div>
                <Button
                    onClick={() => loginWithRedirect()}
                >
                    Auth0 Login
                </Button>
            </div>
        </Grid>

    )
}

export default Auth0;
