import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Biberones from './Biberones'
import Paniales from './Paniales'

const InformeEventos = () => {
  const listarEventosHoy = () => {
    dispatch(modificarTipoListaSeleccionada(1));
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];
    const eventosHoy = eventos.filter(({ fecha }) => {
      const fechaEvento = new Date(fecha).toISOString().split('T')[0];
      return fechaEvento === fechaHoy;
    });
  }
  return (
    <div id='informeEventos'>
      <h2 className="col-12 mb-3">Informe de Eventos</h2>
      <Biberones />
      <Paniales />
    </div>
  )
}

export default InformeEventos