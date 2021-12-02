import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Accounts.module.css';
import {saveTokens, selectTokens} from "../Login/identityTokensSlice";
import {useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";

const Accounts = () => {


    const tokens = useSelector(selectTokens)
    const [token, setToken] = useState('dummyToken')
    const [loginUrl, setLoginUrl] = useState('dummyUrl')
    const [loggedIn, setLoggedIn] = useState(false)
    const[accounts, setAccounts] = useState('no data')

    // try{
    //     if(tokens.value.accessToken && tokens.value.instanceUrl){
    //         setAccessToken(tokens.value.accessToken)
    //         setInstanceUrl(tokens.value.instanceUrl)
    //         setLoggedIn(true)
    //     }
    // }catch(error){
    //     console.error(error)
    // }

    const getAccounts = (access_token, instanceURL) => {
        console.log('before ...', access_token)
        console.log('before...', instanceURL)

        console.log('after...', token)
        console.log('after...', loginUrl)
        const headers = {'Content-Type': 'application/json'}
        const url = `https://sfdc-identity-flows.herokuapp.com/api/accounts/find?instanceUrl=${instanceURL}&accessToken=${access_token}&searchParam=123456`

        fetch(url, {headers})
            .then(async response => {
                const data = await response.json()

                if(!response.ok) {
                    const error = (data && data.message) || response.statusText + ', code: ' + response.statusCode
                    return Promise.reject(error)
                }
                console.log('data before..', data)
                setAccounts(data)
                console.log('data after..', accounts)
            })
            .catch(error => {
                console.error('There was an error : ', error)
            })
    }

    return (
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div>
                <Grid container justifyContent={"center"}>
                    <div>
                        <Button
                            variant={"contained"}
                            disableElevation
                            onClick={() => {
                                setToken(tokens.value.accessToken)
                                setLoginUrl(tokens.value.instanceUrl)
                                getAccounts(tokens.value.accessToken, tokens.value.instanceUrl)
                            }}
                        >
                            Get Accounts
                        </Button>
                    </div>
                </Grid>
            </div>
            <Grid container justifyContent={"center"}>
                <div className={styles.Accounts} data-testid="Accounts">
                    <div>
                        {tokens.value.accessToken}
                    </div>
                    <div>
                        {tokens.value.instanceUrl}
                    </div>


                </div>
            </Grid>

        </Grid>

    )
}

Accounts.propTypes = {};

Accounts.defaultProps = {};

export default Accounts;
