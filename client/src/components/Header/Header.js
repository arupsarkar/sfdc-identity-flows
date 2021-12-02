import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import {AppBar, Container, CssBaseline, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <AppBar position={"static"}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div>
                        <Link to="/accounts">
                            Accounts
                        </Link>
                    </div>



                </Toolbar>
            </Container>

        </AppBar>
    )


};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
