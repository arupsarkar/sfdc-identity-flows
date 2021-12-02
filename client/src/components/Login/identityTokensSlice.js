import { createSlice } from "@reduxjs/toolkit";

const identityTokenSlice = createSlice({
    name: "token",

    initialState: {
        token: ''
    },

    reducers: {
        saveTokens: (state, action) => {

            // const { payload } = action
            // state.protocol = [...state.protocol, payload]
            // state.protocol = payload
            state.value = action.payload
            console.log('identity tokens ', state.value)
        }
    }
})

// const { actions, reducer} = authSlice
// export const selectProtocol = state => state.protocol
export const { saveTokens } = identityTokenSlice.actions
export default identityTokenSlice.reducer