import { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarSesionId, guardarSesionToken, guardarUrlBase } from "../features/loginSlice";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const LoginInputs = () => {
    const URLBASE = "https://babytracker.develotion.com/";
    const campoUser = useRef();
    const campoPass = useRef();
    const dispatch = useDispatch();
    const usuario = useId();
    const pass = useId();
    const navigate = useNavigate();
    const [usuarioCampo, setUsuarioCampo] = useState(0);
    const [passCampo, setPassCampo] = useState(0);

    useEffect(() => {
        comprobarCampos();
    }, []);

    const comprobarCampos = () => {
        comprobarCampoUsuario();
        comprobarCampoPass();
    };

    const comprobarCampoUsuario = () => {
        setUsuarioCampo(campoUser.current.value.length);
    };

    const comprobarCampoPass = () => {
        setPassCampo(campoPass.current.value.length);
    };

    const loginHandler = () => {
        let usu = campoUser.current.value;
        let pass = campoPass.current.value;
        let datosLogin = {
            usuario: usu,
            password: pass
        };
        hacerLogin(datosLogin);
    };

    const hacerLogin = datosUsu => {
        fetch(URLBASE + 'login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsu)
        })
            .then(resp => {
                if (resp.status !== 200) /* throw "Algo salió mal" */;
                return resp.json();
            })
            .then(data => {
                if (data.mensaje !== undefined) {
                    toast.error(data.mensaje);
                } else {
                    iniciarSesion(data);
                    navigate("/dashboard");
                }
            })
    };

    const iniciarSesion = ({ id, apiKey }) => {
        dispatch(guardarSesionId(id));
        dispatch(guardarSesionToken(apiKey));
        localStorage.setItem("APPBebesToken", apiKey);
        localStorage.setItem("idUsuarioLogueado", id);
    };

    return (
        <form className="row justify-content-center align-self-end">
            <div className="mb-2 col-5">
                <label htmlFor={usuario} className="form-label">Usuario</label>
                <input type="text" className="form-control input-transparente" ref={campoUser} id={usuario} onChange={comprobarCampoUsuario} />
            </div>
            <div className="w-100"></div>
            <div className="mb-3 col-5">
                <label htmlFor={pass} className="form-label">Contraseña</label>
                <input type="password" className="form-control input-transparente" ref={campoPass} id={pass} onChange={comprobarCampoPass} />
            </div>
            <div className="w-100"></div>
            <input
                type="button"
                className="btn btn-primary col-2 btn-transparente custom-hover"
                value="Login"
                onClick={loginHandler}
                disabled={usuarioCampo === 0 || passCampo === 0}
            />
            <Link to="/register" className="nav-link btn mt-2">Registrarse</Link>
        </form>
    );
}

export default LoginInputs;
