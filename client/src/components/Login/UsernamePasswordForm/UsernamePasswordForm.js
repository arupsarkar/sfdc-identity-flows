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

    const handleUsernameChange = (event) => {

        setUsername(event.target.value)
        //console.log(username)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        //console.log(password)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username, password)
        const headers = {'Content-Type': 'application/json'}
        const url = `https://sfdc-identity-flows.herokuapp.com/api/login?username=${username}&password=${password}&loginUrl=https://login.salesforce.com`

        fetch(url, {headers})
            .then(async response => {
                await response.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('There was an error : ', error)
            })

    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username :
                    <input type="text" name="username"
                           onChange={handleUsernameChange}/>
                </label>
                <div
                    style={{
                        paddingTop: '20px',
                        boxSizing: 'content-box'

                    }}>

                    <label>
                        Password+Token :
                        <input
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}/>
                    </label>

                </div>
                <button> Login </button>

            </div>
        </form>

    )
}

export default UsernamePasswordForm