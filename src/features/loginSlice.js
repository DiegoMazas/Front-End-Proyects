import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuentaId: 0,
    tokken: "",
    URLBASE: ""
}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        guardarSesionId: (state, actions) => {
            state.cuentaId = actions.payload;
        },
        guardarSesionToken: (state, action) => {
            state.tokken = action.payload;
        },
        guardarUrlBase: (state, action) => {
            state.URLBASE = action.payload;
        }
    }
})
export const { guardarSesionId, guardarSesionToken, guardarUrlBase } = loginSlice.actions;
export default loginSlice.reducer;