import React, {useState} from 'react';

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
                <div>
                    <label>
                        Hostname :
                        <input type="text" name="hostname"
                               onChange={handleHostNameChange}/>
                    </label>
                </div>

                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'

                    }}>
                    <label>
                        Username :
                        <input type="text" name="username"
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
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}/>
                    </label>
                    <div>
                        <label> [append the token to the password.}</label>
                    </div>


                </div>
                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'

                    }}>
                    <button> Login </button>
                </div>


            </div>
        </form>

    )
}

export default UsernamePasswordForm