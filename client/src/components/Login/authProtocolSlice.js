import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "protocol",

    initialState: {
        protocol: ''
    },

    reducers: {
        save: (state, action) => {

            // const { payload } = action
            // state.protocol = [...state.protocol, payload]
            // state.protocol = payload
            state.value = action.payload
            console.log('reducer protocol ', state.value)
        }
    }
})

// const { actions, reducer} = authSlice
// export const selectProtocol = state => state.protocol
export const { save } = authSlice.actions
export default authSlice.reducer