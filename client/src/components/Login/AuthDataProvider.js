import React, {createContext, useMemo, useReducer} from "react";

export const AuthProtocolDataContext = createContext()

const initialState = {
    authProtocolData: 'authProtocolData'
}

const authProtocolReducer = (state, action) => {
    console.log(action.payload, action.type)
    switch (action.type) {
        case '1':
            return {
                ...state,
                authProtocolData: action.payload,
            }
        case '2':
            return {
                ...state,
                authProtocolData: action.payload,
            }
        default:
            return state
    }
}

function init (initialState) {
    return {authProtocolData: initialState}
}

export const AuthDataProvider = ({ children }) => {



    const [state, dispatch] = useReducer(authProtocolReducer, initialState, init)
    const contextValue = useMemo(() => {
        console.log('useMemo() : ', state)
        return {state, dispatch}
    }, [state, dispatch])

    return(
        <AuthProtocolDataContext.Provider
            value={contextValue}
        >
            {children}
        </AuthProtocolDataContext.Provider>
    )
}