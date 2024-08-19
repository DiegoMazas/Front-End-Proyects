import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriasEventos: [],
    eventosUsuario: [],
    tipoListaSeleccionada: 0,
    biberones: [],
    paniales: [],
    comidas: []
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        guardarCategoriasEventos: (state, action) => {
            state.categoriasEventos = action.payload;
        },
        guardarEvntosUsuario: (state, action) => {
            state.eventosUsuario = action.payload;
        },
        agregarEventoSlice: (state, action) => {
            state.eventosUsuario.push(action.payload);
        },
        eliminarEventoSlice: (state, action) => {
            state.eventosUsuario.splice(action.payload, 1);
        },
        modificarTipoListaSeleccionada: (state, action) => {
            state.tipoListaSeleccionada = action.payload;
        },
        modificarBiberones: (state, action) => {
            state.biberones = (action.payload);
        },
        modificarPaniales: (state, action) => {
            state.paniales = (action.payload);
        },
        modificarComidas: (state, action) => {
            console.log("payload", action.payload);
            state.comidas = (action.payload);
        }
    }
})

export const { guardarCategoriasEventos, guardarEvntosUsuario, agregarEventoSlice, eliminarEventoSlice,
    modificarTipoListaSeleccionada, modificarBiberones, modificarPaniales, modificarComidas } = dashboardSlice.actions;

export default dashboardSlice.reducer;
