import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import {AppBar, Container, CssBaseline, Menu, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <AppBar position={"static"}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link to="/" style={{
                                color: 'white'
                            }}>
                                Home - Login Flows
                            </Link>
                        </Typography>
                    </div>

                    <div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link to="/accounts" style={{
                                color: 'white'
                            }}>
                                Accounts
                            </Link>
                        </Typography>
                    </div>


                    <div style={{
                        paddingLeft: "10px",
                        color: "white"
                    }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link to="/foo" style={{
                                color: 'white'
                            }}>
                                Foo
                            </Link>
                        </Typography>

                    </div>


                    <div style={{
                        paddingLeft: "10px",
                        color: "white",
                        justifyContent: "flex-end"
                    }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link to="/Auth0UserProfile" style={{
                                color: 'white'
                            }}>
                                Auth0 User Profile
                            </Link>
                        </Typography>

                    </div>

                    <div style={{
                        paddingLeft: "10px",
                        color: "white",
                        justifyContent: "flex-end"
                    }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link to="/Auth0Logout" style={{
                                color: 'white'
                            }}>
                                Auth0 Logout
                            </Link>
                        </Typography>

                    </div>



                </Toolbar>
            </Container>

        </AppBar>
    )


};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
