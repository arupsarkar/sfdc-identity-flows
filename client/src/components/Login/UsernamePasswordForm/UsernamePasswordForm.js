import React, {useState} from 'react';
import {useParams} from "react-router-dom";



const UsernamePasswordForm = () => {
    let params = useParams()

    return(
        <div>
            <h2>Username : </h2>
            <h2>Password+Token : </h2>
            {params.id}
        </div>
    )
}

export default UsernamePasswordForm