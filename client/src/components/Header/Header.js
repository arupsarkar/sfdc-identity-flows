import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import {AppBar, Container, Toolbar} from "@mui/material";

const Header = () => {
    return (
        <AppBar position={"static"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    Accounts
                </Toolbar>
            </Container>

        </AppBar>
    )


};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
