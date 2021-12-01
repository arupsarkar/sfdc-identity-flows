import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import {AuthProtocolDataContext} from "./AuthDataProvider"
import { useSelector, useDispatch } from "react-redux";
import {save} from "./authProtocolSlice";
import UsernamePasswordForm from "./UsernamePasswordForm/UsernamePasswordForm";
import {Link} from "react-router-dom";
import {Button, Fab} from "@mui/material";


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

    // const { dispatch } = useContext(AuthProtocolDataContext)



    const[identityProtocol, setIdentityProtocol] = useState('')
    const dispatch = useDispatch()
    // const { protocol } = useSelector(state=>state)

    function handleSubmit(flow) {
        // setAuthProtocolData(flow.id)
        console.log(flow.id, flow)
        setIdentityProtocol(flow)
        //dispatch({type: flow.id, payload: identityProtocol})
        dispatch(save(
            {
                id: flow.id,
                protocol: flow.protocol
            }
        ))
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

                            <div style={{
                                paddingTop: '20px',
                            }}>

                            </div>
                            <Link to={`/auth/${flow.id}`}>
                                <Fab variant="extended" color="secondary">
                                    {flow.protocol}
                                </Fab>
                            </Link>


                        </li>
                    ))}
                </ul>
            </div>

    );

};

export default Login;
