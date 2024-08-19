import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { eliminarEventoSlice } from "../features/dashboardSlice"

const Evento = ({ detalle, fecha, idCategoria, id }) => {
    const URLBASE = "https://babytracker.develotion.com/";
    const dispatch = useDispatch();
    const categoriasEventos = useSelector((state) => state.dashboard.categoriasEventos);
    const eventosUsuario = useSelector((state) => state.dashboard.eventosUsuario);
    const categoria = categoriasEventos.find((categoria) => categoria.id === idCategoria);
    const eliminarEventoHandler = () => {
        const posEvento = eventosUsuario.findIndex((evento) => evento.id === id);
        dispatch(eliminarEventoSlice(posEvento));
        eliminarEvento(posEvento);
    }
    const eliminarEvento = (posEvento) => {
        let idUsuario = window.localStorage.getItem("idUsuarioLogueado");
        let token = window.localStorage.getItem("APPBebesToken");
        fetch(URLBASE + `eventos.php?idEvento=${id}`,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "apikey": token,
                    "iduser": idUsuario
                },
            }
        )
            .then(resp => {
                return resp.json();
            })
            .then(datos => {
                const notify = () => toast.success(datos.mensaje);
                notify();
            })
    }

    return (
        <div id="evento" className="scroll-item col-12">
            <p>Evento: {detalle}{" "}
                {categoria && (<img src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`} className="img-fluid circle" />)}
            </p>
            <p>{new Date(fecha).toLocaleString()}</p>
            <input type="button" className=" button-container-interno" value="Eliminar evento" onClick={eliminarEventoHandler} />
        </div>
    );
};

export default Evento;
