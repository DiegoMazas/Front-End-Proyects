import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TiempoRestanteProximoBiberon = () => {
  const biberones = useSelector(state => state.dashboard.biberones);
  const [divColorHandler, setdivColorHandler] = useState(true);
  const [tiempoBiberon, setTiempoBiberon] = useState();
  const tiempoProxBiberon = () => {
    if (biberones.length > 0) {
      const UltimoBiberon = biberones[biberones.length - 1];
      const tiempoUltimo = new Date(UltimoBiberon.fecha) / (1000 * 60);
      const proximoBiberon = tiempoUltimo + 240;
      const hoy = new Date() / (1000 * 60);
      const diferenciaMinutos = (proximoBiberon - hoy).toFixed(0);
      if (proximoBiberon > hoy) {
        setTiempoBiberon(diferenciaMinutos)
      }
      else {
        setTiempoBiberon((diferenciaMinutos * -1))
        setdivColorHandler(false)
      }
    } else {
      setTiempoBiberon("No hay biberones registrados");
    }
  }
  useEffect(() => {
    tiempoProxBiberon();
  }, [biberones]);
  return (
    <div id="tiempoRestante" className="col-12">
      {(divColorHandler) ? <p>Tiempo para el próximo Biberón: <span id="biberonPositivo">{tiempoBiberon}</span></p> : <p>Hace <span id="biberonNegativo">{tiempoBiberon}</span> minutos que debería haber tomado un biberón</p>}
    </div>
  )
}

export default TiempoRestanteProximoBiberon