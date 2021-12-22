import React from 'react';
import styles from './OAuth.module.css';
import {Button, Grid} from "@mui/material";

const OAuth = () => {


    const OAUTH_URL = `${window.location.origin}/api/login/oauth2/auth`
    const CALLBACK_URL = `${window.location.origin}/api/login/oauth2-token/callback`


    const getToken = () => {
        fetch(OAUTH_URL, {
            headers: {
                'Content-Type': 'application/json'
             }
        }).then(data =>{
            console.log('---> data ', data)

            //once the code is received now call the callback URL to get the access token

            fetch(CALLBACK_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((data) =>{
                console.log('---> data ', data)
            }).catch((err) => {
                console.log('---> err ', err)
            })

        }).catch((err) => {
            console.log('---> err', err)
        })
    }

    return(
        <div>
            <Grid container justifyContent={"center"} paddingTop={"40px"}>
                <div>
                    <Grid container justifyContent={"center"}>
                        <div>
                            <Button
                                variant={"contained"}
                                disableElevation
                                onClick={() => {
                                    getToken()
                                }}
                            >
                                OAuth Login
                            </Button>
                        </div>
                    </Grid>
                </div>
            </Grid>

        </div>
    )
}

export default OAuth;
