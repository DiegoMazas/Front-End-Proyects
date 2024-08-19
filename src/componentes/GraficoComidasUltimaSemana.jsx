import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { modificarComidas } from "../features/dashboardSlice";
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Comidas de la semana',
    },
  },
};

const GraficoComidasUltimaSemana = () => {
  const eventos = useSelector(state => state.dashboard.eventosUsuario);
  const [comidasPorDia, setComidasPorDia] = useState([]);
  const [diasRecorrer, setDiasARecorrer] = useState([]);
  function getLast7Dates() {
    const today = new Date();
    let dates = [];
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    setDiasARecorrer(dates);
  }
  const cargarComidasPorDia = () => {
    const eventosComidaOrdenados = eventos
      .map(evento => ({
        ...evento,
        fecha: new Date(evento.fecha)
      }))
      .sort((a, b) => b.fecha - a.fecha);
    let comidasPorDiaTemp = [];
    const idCategoria = 31;
    for (let i = 0; i < diasRecorrer.length; i++) {
      let fechaARecorrer = diasRecorrer[i];
      let contador = 0;
      for (let k = 0; k < eventosComidaOrdenados.length; k++) {

        const fechaFormateada = format(new Date(eventosComidaOrdenados[k].fecha), 'yyyy-MM-dd');
        const categoriaEvento = eventosComidaOrdenados[k].idCategoria;
        if (fechaARecorrer === fechaFormateada && idCategoria === categoriaEvento) {
          contador++;
          comidasPorDiaTemp[i] = contador;
        }
      }
    }
    const hoy = new Date();
    const numDia = hoy.getDay() * (-1);
    const arrayInvertido = [...comidasPorDiaTemp].reverse();
    const fechasRecortdas = arrayInvertido.slice(numDia);
    setComidasPorDia(fechasRecortdas);
  }
  useEffect(() => {
    getLast7Dates();
    cargarComidasPorDia();
  }, [eventos], comidasPorDia);
  return (
    <div>
      <Bar
        options={options}
        data={{
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Cantidad de comidas',
              data: comidasPorDia,
              backgroundColor: 'rgba(1, 99, 132, 0.7)',
            }
          ],
        }}
      />
    </div>
  );
}

export default GraficoComidasUltimaSemana;
