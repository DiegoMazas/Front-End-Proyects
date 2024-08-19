import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Evento from "./Evento";
import { modificarTipoListaSeleccionada } from "../features/dashboardSlice"
import { format } from 'date-fns';

const ListadoEventos = () => {
    const tipoListaSeleccionada = useSelector(state => state.dashboard.tipoListaSeleccionada);
    const eventos = useSelector(state => state.dashboard.eventosUsuario);
    const eventosOrdenados = eventos
        .map(evento => ({
            ...evento,
            fecha: new Date(evento.fecha)
        }))
        .sort((a, b) => b.fecha - a.fecha);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const dispatch = useDispatch();
    const listarEventosHoy = () => {
        dispatch(modificarTipoListaSeleccionada(1));
        const hoy = new Date();
        const fechaFormateadaHoy = format(new Date(hoy), 'yyyy-MM-dd')
        const eventosHoy = eventosOrdenados.filter(({ fecha }) => {
            const fechaFormateadaEvento = format(new Date(fecha), 'yyyy-MM-dd');
            return fechaFormateadaEvento === fechaFormateadaHoy;
        });
        setEventosFiltrados(eventosHoy);
    }
    const ocultarListado = () => {
        setEventosFiltrados([])
        dispatch(modificarTipoListaSeleccionada(0))
    }

    const listarEventosAnteriores = () => {
        dispatch(modificarTipoListaSeleccionada(2));
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split('T')[0];
        const eventosAnteriores = eventos.filter(evento => {
            const fechaEvento = new Date(evento.fecha).toISOString().split('T')[0];
            return fechaEvento < fechaHoy;
        });
        setEventosFiltrados(eventosAnteriores);
    }
    useEffect(() => {
        if (tipoListaSeleccionada === 1) listarEventosHoy();
        if (tipoListaSeleccionada === 2) listarEventosAnteriores();
        if (tipoListaSeleccionada === 0) setEventosFiltrados([]);
    }, [eventos])
    return (
        <>
            <div id="listadoEventos">
                <h2 className="col-12 mb-3">Listado de Eventos</h2>
                <div className="button-container">
                    <input type="button" className="btn btn-primary me-2 custom-hover" value="Listar eventos de hoy" onClick={listarEventosHoy} />
                    <input type="button" className="btn btn-primary custom-hover" value="Listar eventos anteriores" onClick={listarEventosAnteriores} />
                    <input type="button" className="btn btn-primary custom-hover" value="OcultarListado" onClick={ocultarListado} />
                </div>
                {(eventosFiltrados.length === 0) ? <p>No hay eventos para mostrar</p> : (
                    <div className="scroll-container">
                        {eventosFiltrados.map(evento => <Evento key={evento.id} {...evento} />)}
                    </div>
                )}
            </div>

        </>
    )
}

export default ListadoEventos;
