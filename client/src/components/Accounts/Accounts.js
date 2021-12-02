import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Accounts.module.css';
import {selectTokens} from "../Login/identityTokensSlice";
import {useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";

const Accounts = () => {
    const tokens = useSelector(selectTokens)
    const [accessToken, setAccessToken] = useState('')
    const [instanceUrl, setInstanceUrl] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    try{
        if(tokens.value.accessToken && tokens.value.instanceUrl){
            setAccessToken(tokens.value.accessToken)
            setInstanceUrl(tokens.value.instanceUrl)
            setLoggedIn(true)
        }
    }catch(error){
        console.error(error)
    }

    const getAccounts = (accessToken, instanceUrl) => {
        console.log(accessToken)
        console.log(instanceUrl)
    }

    return (
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div>
                <Grid container justifyContent={"center"}>
                    <div>
                        <Button
                            variant={"contained"}
                            disableElevation
                            onClick={() => {getAccounts(accessToken, instanceUrl)}}
                        >
                            Get Accounts
                        </Button>
                    </div>
                </Grid>
            </div>
            <Grid container justifyContent={"center"}>
                <div className={styles.Accounts} data-testid="Accounts">
                    {tokens.value.accessToken}
                    {tokens.value.instanceUrl}
                </div>
            </Grid>

        </Grid>

    )
}

Accounts.propTypes = {};

Accounts.defaultProps = {};

export default Accounts;
