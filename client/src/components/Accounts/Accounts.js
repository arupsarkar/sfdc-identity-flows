import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accounts.module.css';
import {selectTokens} from "../Login/identityTokensSlice";
import {useSelector} from "react-redux";

const Accounts = () => {
    const tokens = useSelector(selectTokens)
    return (
        <div className={styles.Accounts} data-testid="Accounts">
            {tokens.accessToken}
            {tokens.instanceUrl}
        </div>
    )
}

Accounts.propTypes = {};

Accounts.defaultProps = {};

export default Accounts;
