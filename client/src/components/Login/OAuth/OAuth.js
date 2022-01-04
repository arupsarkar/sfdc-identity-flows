import React from 'react';
import styles from './OAuth.module.css';
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";

const OAuth = () => {



    const CALLBACK_URL = `${window.location.origin}/api/login/oauth2-token/callback`

    const [env, setEnv] = React.useState('prod');

    const handleChange = (event) => {
        console.log('---> environment handle change ', event.target.value)
        setEnv(event.target.value)
    }

    const getToken = () => {
        console.log('---> environment get token ', env)
        window.location.href = `${window.location.origin}/api/login/oauth2/auth/?env=${env}`
        const OAUTH_URL = `${window.location.origin}/api/login/oauth2/auth/?env=${env}`
        fetch(OAUTH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
             },
        }).then(data =>{
            console.log('---> data ', data)

            //once the code is received now call the callback URL to get the access token

            fetch(CALLBACK_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
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
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Environment</FormLabel>
                            <div>
                                <RadioGroup
                                    aria-label="environment"
                                    defaultValue="prod"
                                    name="radio-buttons-group"
                                    value={env}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="prod" control={<Radio />} label="Production" />
                                    <FormControlLabel value="test" control={<Radio />} label="Test" />
\                                </RadioGroup>

                            </div>

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
                        </FormControl>


                    </Grid>
                </div>
            </Grid>

        </div>
    )
}

export default OAuth;
