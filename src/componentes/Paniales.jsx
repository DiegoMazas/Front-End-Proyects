import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { modificarPaniales } from "../features/dashboardSlice";


const paniales = () => {
  const eventos = useSelector(state => state.dashboard.eventosUsuario);
  const paniales = useSelector(state => state.dashboard.paniales);
  const [tiempoPanial, setTiempoPanial] = useState();
  const dispatch = useDispatch();
  const panialesHoy = () => {
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];
    const eventosPanialesHoy = eventos.filter(evento => {
      const fechaEvento = new Date(evento.fecha).toISOString().split('T')[0];
      const categoriaEvento = evento.idCategoria;
      return fechaEvento === fechaHoy && categoriaEvento === 33;
    });
    dispatch(modificarPaniales(eventosPanialesHoy));
  }
  const tiempoDesdeUltimoPanial = () => {
    if (paniales.length > 0) {
      const UltimoPanial = paniales[paniales.length - 1];
      const tiempoUltimo = new Date(UltimoPanial.fecha);
      const hoy = new Date();
      const diferenciaMinutos = ((hoy - tiempoUltimo) / (1000 * 60)).toFixed(0);
      setTiempoPanial("Tiempo transcurrido desde el último pañal: " + diferenciaMinutos + " minutos.");
    } else {
      setTiempoPanial("No hay pañales registrados")
    }

  }
  useEffect(() => {
    panialesHoy();
  }, [eventos])
  useEffect(() => {
    tiempoDesdeUltimoPanial();
  }, [paniales])
  return (
    <div id='paniales'>
      <h5>paniales</h5>
      <p>Total pañales cambiados en el día: {paniales.length}</p>
      <p>{tiempoPanial}</p>
    </div>
  )
}

export default paniales