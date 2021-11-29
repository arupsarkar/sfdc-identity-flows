import { configureStore } from "@reduxjs/toolkit";
import authProtocolReducer from "../components/Login/authProtocolSlice"

export default configureStore({
    reducer: {
        protocol: authProtocolReducer
    }
})