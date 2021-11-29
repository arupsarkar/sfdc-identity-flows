import React, {} from 'react';

import { useSelector } from "react-redux";

const UsernamePasswordForm = () => {

    // const { state } = useContext(AuthProtocolDataContext)
    const protocol = useSelector(state=> state)
    // if(protocol) {
    //     console.log(protocol.protocol.value.id)
    //     console.log(protocol.protocol.value.protocol)
    // }

    return(
        <div>
            <h2>Username : </h2>
            <h2>Password+Token : </h2>
        </div>
    )
}

export default UsernamePasswordForm