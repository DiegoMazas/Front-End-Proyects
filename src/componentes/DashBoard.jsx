import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { guardarCategoriasEventos, guardarEvntosUsuario } from "../features/dashboardSlice"
import AgregarEvento from "./AgregarEvento";
import ListadoEventos from "./ListadoEventos";
import InformeEventos from "./InformeEventos";
import Analisis from "./Analisis";
import CerrarSesion from "./CerrarSesion";

const DashBoard = () => {
    const [estadoSesion, setEstadoSesion] = useState(false)
    const dispatch = useDispatch();
    const URLBASE = "https://babytracker.develotion.com/";
    const navigate = useNavigate();
    const idUsuario = window.localStorage.getItem("idUsuarioLogueado");
    const token = window.localStorage.getItem("APPBebesToken");
    useEffect(() => {
        if (localStorage.getItem("idUsuarioLogueado") === null) {
            navigate("/");
        }
        setEstadoSesion(true);
        fetch(URLBASE + `categorias.php`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "apikey": token,
                "iduser": idUsuario
            },
        })
            .then(resp => {
                return resp.json();
            })
            .then(datos => {
                dispatch(guardarCategoriasEventos(datos.categorias))
            })
        fetch(URLBASE + `eventos.php?idUsuario=${idUsuario}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "apikey": token,
                "iduser": idUsuario
            },
        })
            .then(resp => {
                return resp.json();
            })
            .then(datos => {
                dispatch(guardarEvntosUsuario(datos.eventos))
            })
    }, [])
    return (
        <>
            <div id="dashboard" className="row-cols-md-2  m-5 ">
                <AgregarEvento />
                <Analisis />
                <ListadoEventos />
                <InformeEventos />
                {estadoSesion && <CerrarSesion />}
            </div>


        </>
    )
}

export default DashBoard