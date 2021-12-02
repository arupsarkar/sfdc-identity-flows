import React, {useState} from 'react';

import {Box, Button, Grid, TextField} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import {saveTokens} from "../identityTokensSlice";


const UsernamePasswordForm = () => {

    // const { state } = useContext(AuthProtocolDataContext)
    const protocol = useSelector(state=> state)
    const dispatch = useDispatch()
    // if(protocol) {
    //     console.log(protocol.protocol.value.id)
    //     console.log(protocol.protocol.value.protocol)
    // }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hostname, setHostname] = useState('')

    const handleHostNameChange = (event) => {
        setHostname(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const headers = {'Content-Type': 'application/json'}
        const url = `https://sfdc-identity-flows.herokuapp.com/api/login?username=${username}&password=${password}&loginUrl=${hostname}`

        fetch(url, {headers})
            .then(async response => {
                const data = await response.json()

                if(!response.ok) {
                    const error = (data && data.message) || response.statusText + ', code: ' + response.statusCode
                    return Promise.reject(error)
                }
                console.log(data.accessToken, data.instanceUrl)
                dispatch(saveTokens({
                    accessToken: data.accessToken,
                    instanceUrl: data.instanceUrl
                }))

            })
            .catch(error => {
                console.error('There was an error : ', error)
            })

    }
    return(
        <Grid container justifyContent={"center"} spacing={0} paddingTop={"40px"}>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                <form onSubmit={handleSubmit}>
                    <div>

                        <div style={{
                            paddingTop: '20px',
                            boxSizing: 'content-box'
                        }}>
                            <TextField
                                style={{
                                    width: '300px'
                                }}
                                required
                                id="outlined-required"
                                label="hostname"
                                onChange={handleHostNameChange}
                            >

                            </TextField>
                        </div>

                        <div
                            style={{
                                paddingTop: '20px',
                                boxSizing: 'content-box'}}
                        >
                            <TextField
                                style={{
                                    width: '300px'
                                }}
                                required
                                id="outlined-required"
                                label="username"
                                onChange={handleUsernameChange}
                            >
                            </TextField>

                        </div>

                        <div
                            style={{
                                paddingTop: '20px',
                                boxSizing: 'content-box'}}
                        >
                            <TextField
                                style={{
                                    width: '300px'
                                }}
                                required
                                type="password"
                                id="outlined-required"
                                label="password+token"
                                onChange={handlePasswordChange}
                            >
                            </TextField>

                        </div>

                    </div>
                    <div
                        style={{
                            paddingTop: '20px',
                            boxSizing: 'content-box'

                        }}>
                        <Button variant="contained" disableElevation
                                type="submit"
                        > Login </Button>
                    </div>

                </form>
            </Box>
        </Grid>



    )
}

export default UsernamePasswordForm