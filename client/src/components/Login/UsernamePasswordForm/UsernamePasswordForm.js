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
                            onInput={(e) => setHostname(e.target.value)}
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
                            onInput={(e) => setUsername(e.target.value)}
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
                            onInput={(e) => setPassword(e.target.value)}
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

    )
}

export default UsernamePasswordForm