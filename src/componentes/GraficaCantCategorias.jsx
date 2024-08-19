import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
      text: 'Eventos por categorias',
    },
  },
};

const GraficaCantCategorias = () => {
  const eventos = useSelector(state => state.dashboard.eventosUsuario);
  const categorias = useSelector(state => state.dashboard.categoriasEventos);
  const [eventosPorCategoria, setEventosPorCategoria] = useState({ labels: [], data: [] });

  const cargarGrafica = () => {
    const conteoCategorias = eventos.reduce((acc, evento) => {
      const categoriaId = evento.idCategoria;
      acc[categoriaId] = (acc[categoriaId] || 0) + 1;
      return acc;
    }, {});
    const categoriasConEventos = categorias.filter(categoria => conteoCategorias[categoria.id] > 0);
    const labels = categoriasConEventos.map(categoria => categoria.tipo);
    const data = labels.map(tipo => {
      const categoria = categorias.find(categoria => categoria.tipo === tipo);
      return conteoCategorias[categoria.id];
    });
    setEventosPorCategoria({ labels, data });
  };

  useEffect(() => {
    cargarGrafica();
  }, [eventos, categorias]);

  return (
    <div>
      <Bar
        options={options}
        data={{
          labels: eventosPorCategoria.labels,
          datasets: [
            {
              label: 'Cantidad de Eventos',
              data: eventosPorCategoria.data,
              backgroundColor: 'rgba(1, 99, 132, 0.7)',
            }
          ],
        }}
      />
    </div>
  )
}

export default GraficaCantCategorias