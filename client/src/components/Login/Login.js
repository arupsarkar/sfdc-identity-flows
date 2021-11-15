import React, {useState} from 'react';
import styles from './Login.module.css';
import * as events from "events";
import {Link,  useNavigate} from "react-router-dom";
import UsernamePasswordForm from "./UsernamePasswordForm/UsernamePasswordForm";

const identityFlows = [
    {
        id: '1',
        protocol: 'username, password+token'
    },
    {
        id: '2',
        protocol: 'OAuth2.0'
    },
    {
        id: '3',
        protocol: 'OpenId Connect',
    },
    {
        id: '4',
        protocol: 'JWT'
    },
    {
        id: '5',
        protocol: 'Auth0'
    }

]

const Login = () => {

    const[identityProtocol, setIdentityProtocol] = useState('')
    const navigate = useNavigate()

    function handleSubmit(flow) {
        console.log(flow)
        setIdentityProtocol(flow.protocol)
        navigate(`${flow.id}`, {replace: true})
    }

    return (
        <div className={styles.Login} data-testid="Login">
            <h2>
                Login Flows
            </h2>
            <br/>
            <ul>
                {identityFlows.map(flow => (
                    <li key={flow.id}>
                        <Link
                            style={{display: "block", margin: "1rem 0"}}
                            to={`/${flow.id}`}
                            key={flow.id}
                        >
                            {flow.protocol}
                            <button onClick={() => handleSubmit(flow)}> {flow.protocol} </button>
                        </Link>


                    </li>
                ))}
            </ul>
        </div>
    );

};


export default Login;
