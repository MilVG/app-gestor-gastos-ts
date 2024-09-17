
import { ChangeEvent } from 'react'
import { datoscategorias } from '../datos/categorias'
import { usePresupuesto } from '../hooks/usePresupuesto'

export default function FiltrarPorCategorias() {

  const { dispatch } = usePresupuesto()

  const handleOnchage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'añadir-filtrado-categoria', payload: { id: e.target.value } })
  }
  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>

      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='categoria'>Filtrar Gastos</label>
          <select
            id='categoria'
            className='bg-slate-100 p-3 flex-1 rounded'
            onChange={handleOnchage}
          >
            <option value="">--Todas las Categorias</option>
            {datoscategorias.map(categoria => (
              <option
                value={categoria.id}
                key={categoria.id}
              >
                {categoria.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

