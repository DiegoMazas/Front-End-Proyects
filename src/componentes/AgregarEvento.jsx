import React, { useState, useRef, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { agregarEventoSlice } from "../features/dashboardSlice";
import { format } from 'date-fns';

const AgregarEvento = () => {
    const dispatch = useDispatch();
    const URLBASE = "https://babytracker.develotion.com/";
    const idUsuario = window.localStorage.getItem("idUsuarioLogueado");
    const token = window.localStorage.getItem("APPBebesToken");
    const categoriaId = useId();
    const categoriasEventos = useSelector(state => state.dashboard.categoriasEventos);
    const campoDetalles = useRef();
    const [fechaEvento, setFechaEvento] = useState("");
    const [categoriaIdHandler, setCategoriaId] = useState(0);
    const fechaActual = new Date().toISOString();
    const agregarEventoHandler = () => {
        if (categoriaIdHandler === 0) {
            const notify = () => toast.error("Seleccione una categoria.");
            notify();
        } else if (fechaEvento === '') {
            const fechaFormateada = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            setFechaEvento(fechaFormateada);

        } else if (fechaEvento > fechaActual) {
            const notify = () => toast.error("La fecha del evento no puede ser posterior a la fecha actual.");
            notify();
        } else {
            let evento = {
                idCategoria: categoriaIdHandler,
                idUsuario: Number(idUsuario),
                detalle: campoDetalles.current.value,
                fecha: fechaEvento
            }
            agregarEvento(evento);
        }
    }

    const agregarEvento = (evento) => {
        fetch(URLBASE + 'eventos.php',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "apikey": token,
                    "iduser": idUsuario
                },
                body: JSON.stringify(evento)
            }
        )
            .then(resp => resp.json())
            .then(datos => {
                evento.id = datos.idEvento;
                dispatch(agregarEventoSlice(evento));
                toast.success(datos.mensaje);
            })
    }
    const fechaHandler = e => {
        const fecha = e.target.value;
        const fechaFormateada = format(new Date(fecha), 'yyyy-MM-dd HH:mm:ss')
        setFechaEvento(fechaFormateada);
    }
    const categoriaHandler = e => {
        const stringNumber = e.target.value;
        const integerNumber = parseInt(stringNumber, 10);
        setCategoriaId(integerNumber);
    }
    return (
        <div id="agregarEvento">
            <h2 className="col-12 mb-3">Agregar nuevo evento</h2>
            <form>
                <label htmlFor={categoriaId}>Seleccione una categoría</label>
                <select required onChange={categoriaHandler} className="form-control" id={categoriaId}>
                    <option value="">Seleccione...</option>
                    {categoriasEventos.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
                    ))}
                </select>
                <label required htmlFor="fechaEvento">Fecha</label>
                <input className="form-control" type="datetime-local" id="fechaEvento" value={fechaEvento} onChange={fechaHandler} />
                <label htmlFor="textArea">Detalles</label>
                <textarea name="textArea" id="textArea" placeholder="Información adicional" ref={campoDetalles}></textarea>
                <input type="button" className="btn btn-primary custom-hover" value="Agregar evento" onClick={agregarEventoHandler} />
            </form>
        </div>
    )
}

export default AgregarEvento;
