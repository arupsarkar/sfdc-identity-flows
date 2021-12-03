import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Foo.module.css';
import {Button, Grid} from "@mui/material";

const Foo = () => {

    const[ val, setVal] = useState({param1: "", param2: ""})

    const handleClick = (val1, val2) => {

        console.log('before ', val1)
        console.log('before ', val2)
        setVal(({param1: val1, param2: val2}, async () => {
           await validateIdentityParams()
        }))

    }

    const validateIdentityParams = async () => {
        await Promise.resolve().then(() => {
                console.log('after ', val.param1)
                console.log('after ', val.param2)
            }
        )

    }

    return (
        <Grid container justifyContent={"center"} paddingTop={"40px"}>
            <div className={styles.Foo} data-testid="Foo">
                <Button
                    variant={"contained"}
                    disableElevation
                    onClick={() => {
                        handleClick("test1", "test2")
                    }}
                >
                    Get Data
                </Button>
                <div>
                    {val.param1}
                </div>
            </div>
        </Grid>

    )
}


Foo.propTypes = {};

Foo.defaultProps = {};

export default Foo;
