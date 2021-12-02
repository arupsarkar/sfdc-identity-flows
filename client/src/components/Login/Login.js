import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import {AuthProtocolDataContext} from "./AuthDataProvider"
import { useSelector, useDispatch } from "react-redux";
import {save} from "./authProtocolSlice";
import UsernamePasswordForm from "./UsernamePasswordForm/UsernamePasswordForm";
import {Link} from "react-router-dom";
import {Box, Button, Fab, Grid, makeStyles} from "@mui/material";


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

        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                <div>
                    <Grid container justifyContent={"center"}>
                        <h2>
                            Login Flows
                        </h2>
                    </Grid>
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
            </Box>
        </Grid>

    );

};

export default Login;
