import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { guardarSesionId, guardarSesionToken } from "../features/loginSlice";
import { toast } from 'react-toastify';

const RegisterInputs = () => {
    const URLBASE = "https://babytracker.develotion.com/";
    const user = useId();
    const pass = useId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectIdDep = useId();
    const selectIdCiud = useId();
    const campoUser = useRef();
    const campoPass = useRef();
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(0);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(0);
    useEffect(() => {
        fetch(URLBASE + 'departamentos.php')
            .then(resp => resp.json())
            .then(datos => {
                setDepartamentos(datos.departamentos);
            })
    }, [URLBASE]);
    const cargarCiudades = (e) => {
        const selectedValue = e.target.value;
        setDepartamentoSeleccionado(selectedValue);
        fetch(URLBASE + `ciudades.php?idDepartamento=${selectedValue}`)
            .then(resp => resp.json())
            .then(datos => {
                setCiudades(datos.ciudades)
            })
    }
    const cargarIdCiudadSeleccionada = (e) => {
        setCiudadSeleccionada(e.target.value);
    };
    const registroHandler = () => {
        let nuevoRegistro = {
            usuario: campoUser.current.value,
            password: campoPass.current.value,
            departamento: departamentoSeleccionado,
            ciudad: ciudadSeleccionada
        }
        if (nuevoRegistro.departamento === 0) {
            const notify = () => toast.error("Seleccione departamento y ciudad");
            notify();
        } else if (nuevoRegistro.ciudad === 0) {
            setCiudadSeleccionada(ciudades[0].id);
        } else {
            hacerRegistro(nuevoRegistro);
        }
    }
    const hacerRegistro = nuevoRegistro => {
        fetch(URLBASE + 'usuarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.mensaje !== undefined) {
                    const notify = () => toast.error(data.mensaje);
                    notify();
                } else {
                    iniciarSesion(data)
                    navigate("/dashboard");
                    const notify = () => toast.success("Registro exitoso");
                    notify();
                }
            })

    }
    const iniciarSesion = ({ id, apiKey }) => {
        dispatch(guardarSesionId(id));
        dispatch(guardarSesionToken(apiKey))
        localStorage.setItem("APPBebesToken", apiKey);
        localStorage.setItem("idUsuarioLogueado", id);
    }
    return (
        <div>
            <form className="row justify-content-center align-self-end">
                <div className="mb-2 col-5">
                    <label htmlFor={user} className="form-label">Usuario</label>
                    <input type="text" className="form-control input-transparente" ref={campoUser} id={user} />
                </div>
                <div className="w-100"></div>
                <div className="mb-3 col-5">
                    <label htmlFor={pass} className="form-label">Contraseña</label>
                    <input type="password" className="form-control input-transparente" ref={campoPass} id={pass} />
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor={selectIdDep} className="form-label">Seleccione un Departamento: </label>
                    <select id={selectIdDep} onChange={cargarCiudades}>
                        <option value="">Seleccione...</option>
                        {departamentos.map(dep => (
                            <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor={selectIdCiud} className="form-label">Seleccione un Ciudad: </label>
                    <select id={selectIdCiud} onChange={cargarIdCiudadSeleccionada}>
                        {ciudades.map(ciud => (
                            <option key={ciud.id} value={ciud.id}>{ciud.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="w-100"></div>
                <input type="button" className="btn btn-primary col-2 btn-transparente custom-hover" value={"Registrarme"} onClick={registroHandler} />
                <Link to="/" className="nav-link btn">Login</Link>
            </form>
        </div>
    );
};

export default RegisterInputs;
