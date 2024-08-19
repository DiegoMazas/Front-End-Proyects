import { useNavigate } from "react-router-dom"

const CerrarSesion = () => {
    const navigate = useNavigate()
    const cerrar = () => {
        window.localStorage.clear();
        navigate("/");
    }

    return (
        <div className="position-absolute bottom-0 end-0 p-5 mb-5 ">
            <input type="button" id="cerrarSesion" className="btn btn-primary button-cerrarSesion" value="Cerrar sesión" onClick={cerrar} />
        </div>
    )
}

export default CerrarSesion