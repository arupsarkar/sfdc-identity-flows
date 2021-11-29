import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import {AuthProtocolDataContext} from "./AuthDataProvider"
import { useSelector, useDispatch } from "react-redux";
import {save} from "./authProtocolSlice";
import UsernamePasswordForm from "./UsernamePasswordForm/UsernamePasswordForm";
import {Link} from "react-router-dom";


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
                            {/*<Link*/}
                            {/*    style={{display: "block", margin: "1rem 0"}}*/}
                            {/*    to={`/${flow.id}`}*/}
                            {/*    key={flow.id}*/}
                            {/*>*/}
                            {/*    {flow.protocol}*/}
                            <Link to={`/auth/${flow.id}`}>
                                <button>
                                    {flow.protocol}
                                </button>
                                {/*<button type="button"*/}
                                {/*        onClick={() => handleSubmit(flow)}>*/}
                                {/*</button>*/}

                            </Link>
                            {/*<button onClick={() => handleSubmit(flow)}> {flow.protocol} </button>*/}

                            {/*</Link>*/}


                        </li>
                    ))}
                </ul>
                {/*<UsernamePasswordForm/>*/}
            </div>

    );

};

export default Login;
