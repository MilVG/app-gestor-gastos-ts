import { useMemo } from 'react'
import { formatDate } from '../helpers'
import { Gastos } from '../types'
import CantidadDinero from './CantidadDinero'
import { datoscategorias } from '../datos/categorias'
import { usePresupuesto } from '../hooks/usePresupuesto'

//libreria animacion selecion de intms para aditar e eliminar swapeable-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

type GastoDetalleprops = {
  gasto: Gastos
}

export default function Gasto({ gasto }: GastoDetalleprops) {

  const { dispatch } = usePresupuesto()

  const categoriaInfo = useMemo(() => datoscategorias.filter(cat => cat.id === gasto.categoria)[0], [gasto])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'recibir-id-gasto', payload: { id: gasto.id } })}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const tradingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'eliminar-gasto', payload: { id: gasto.id } })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (

    <SwipeableList className='shadow-lg rounded-xl'>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={tradingActions()}

      >
        <div className='bg-white  p-10 w-full border-b border-gray-200 flex gap-5 items-center mt-2'>
          <div>
            <img
              src={`/imagesCategorias/icono_${categoriaInfo.icon}.svg`}
              alt='icono gasto'
              className='w-20'
            />
          </div>

          <div className='flex-1 space-y-4'>
            <p className='text-sm font-bold uppercase text-slate-500'>{categoriaInfo.name}</p>
            <p>{gasto.nombreGasto}</p>
            <p className='text-slate-600 text-sm'>{formatDate(gasto.fecha!.toString())}</p>
          </div>

          <CantidadDinero
            cantidad={gasto.cantidad}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

