import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accounts.module.css';
import {selectTokens} from "../Login/identityTokensSlice";
import {useSelector} from "react-redux";
import {Grid} from "@mui/material";

const Accounts = () => {
    const tokens = useSelector(selectTokens)
    console.log({tokens})
    return (
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div>
                <Grid container justifyContent={"center"}>
                    <div>
                        Accounts:
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
