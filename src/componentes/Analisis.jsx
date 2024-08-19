import React from 'react'
import GraficaCantCategorias from './GraficaCantCategorias'
import GraficoComidasUltimaSemana from './GraficoComidasUltimaSemana'
import TiempoRestanteProximoBiberon from './TiempoRestanteProximoBiberon'

const Analisis = () => {
  return (
    <div id='analisis' className='row-cols-2 '>
      <h2 className='col-12 mb-3'>Analisis</h2>
      <GraficaCantCategorias />
      <GraficoComidasUltimaSemana />
      <TiempoRestanteProximoBiberon />
    </div>
  )
}

export default Analisis