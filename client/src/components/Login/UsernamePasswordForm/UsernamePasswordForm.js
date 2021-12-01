import React, {useState} from 'react';

import {Button, TextField} from "@mui/material";

import { useSelector } from "react-redux";
import {use} from "express/lib/router";

const UsernamePasswordForm = () => {

    // const { state } = useContext(AuthProtocolDataContext)
    const protocol = useSelector(state=> state)
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

            })
            .catch(error => {
                console.error('There was an error : ', error)
            })

    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                {/*<div>*/}
                {/*    <label>*/}
                {/*        Hostname :*/}
                {/*        <input*/}
                {/*            style={{*/}
                {/*                width: '300px'*/}
                {/*            }}*/}
                {/*            type="text"*/}
                {/*            name="hostname"*/}
                {/*            onChange={handleHostNameChange}/>*/}
                {/*    </label>*/}
                {/*</div>*/}

                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'

                    }}>
                    <label>
                        Username :
                        <input
                            style={{
                                width: '300px'
                            }}
                            type="text"
                            name="username"
                            onChange={handleUsernameChange}/>
                    </label>
                </div>

                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'
                    }}>

                    <label>
                        Password :
                        <input
                            style={{
                                width: '300px'
                            }}
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}/>
                    </label>
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
                            defaultValue="https://login.salesforce.com"
                            onChange={handleHostNameChange}
                        >

                        </TextField>
                    </div>

                    <div>
                        <label> [append the token to the password.]</label>
                    </div>


                </div>
                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'

                    }}>
                    <Button variant="contained" disableElevation> Login </Button>
                </div>


            </div>
        </form>

    )
}

export default UsernamePasswordForm