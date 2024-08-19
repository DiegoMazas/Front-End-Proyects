import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice"
import dashboardReducer from "../features/dashboardSlice";
export const store = configureStore({
    reducer: {
        login: loginReducer,
        dashboard: dashboardReducer,
    }
})