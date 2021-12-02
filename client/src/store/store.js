import { configureStore } from "@reduxjs/toolkit";
import authProtocolReducer from "../components/Login/authProtocolSlice"
import identityTokensSlice from "../components/Login/identityTokensSlice";

export default configureStore({
    reducer: {
        protocol: authProtocolReducer,
        token: identityTokensSlice
    }
})