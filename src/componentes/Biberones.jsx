import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { modificarBiberones } from "../features/dashboardSlice";


const Biberones = () => {
  const eventos = useSelector(state => state.dashboard.eventosUsuario);
  const biberones = useSelector(state => state.dashboard.biberones);
  const [tiempoBiberon, setTiempoBiberon] = useState();
  const dispatch = useDispatch();
  const biberonesHoy = () => {
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];
    const eventosBiberonesHoy = eventos.filter(evento => {
      const fechaEvento = new Date(evento.fecha).toISOString().split('T')[0];
      const categoriaEvento = evento.idCategoria;
      return fechaEvento === fechaHoy && categoriaEvento === 35;
    });
    dispatch(modificarBiberones(eventosBiberonesHoy));
  }
  const tiempoDesdeUltimoBiberon = () => {
    if (biberones.length > 0) {
      const UltimoBiberon = biberones[biberones.length - 1];
      const tiempoUltimo = new Date(UltimoBiberon.fecha);
      const hoy = new Date();
      const diferenciaMinutos = ((hoy - tiempoUltimo) / (1000 * 60)).toFixed(0);
      setTiempoBiberon("Tiempo transcurrido desde el último Biberón: " + diferenciaMinutos + " minutos.");
    } else {
      setTiempoBiberon("No hay biberones registrados")
    }

  }
  useEffect(() => {
    biberonesHoy();
  }, [eventos])
  useEffect(() => {
    tiempoDesdeUltimoBiberon();
  }, [biberones])
  return (
    <div id='biberones'>
      <h5>Biberones</h5>
      <p>Total Biberones ingeridos en el día: {biberones.length}</p>
      <p>{tiempoBiberon}</p>
    </div>
  )
}

export default Biberones