import { v4 as uuidv4 } from "uuid"
import { Gastos, GastoTemporal, Categoria } from "../types"

export type presupuestoAcciones =
  { type: 'añadir-presupuesto', payload: { presupuesto: number } } |
  { type: 'show-modal' } |
  { type: 'hide-model' } |
  { type: 'añadir-gastos', payload: { gasto: GastoTemporal } } |
  { type: 'eliminar-gasto', payload: { id: Gastos['id'] } } |
  { type: 'recibir-id-gasto', payload: { id: Gastos['id'] } } |
  { type: 'actualizar-gasto', payload: { gastos: Gastos } } |
  { type: 'resetear-app' } |
  { type: 'añadir-filtrado-categoria', payload: { id: Categoria['id'] } }


export type presupuestoState = {
  presupuesto: number
  modal: boolean
  gastos: Gastos[]
  editarId: Gastos['id']
  categoriaFiltrada: Categoria['id']
}
// defincion de local storage para la definicion de presupuesto inicial
const iniciarPresupuesto = (): number => {
  const localStoragePresupuesto = localStorage.getItem('presupuesto')
  return localStoragePresupuesto ? +localStoragePresupuesto : 0
}

//defincion de localStorage para alamacenar los gastos

const localStorageGastos = (): Gastos[] => {
  const localStoragegastos = localStorage.getItem('gastos')
  return localStoragegastos ? JSON.parse(localStoragegastos) : []
}

export const initialState: presupuestoState = {
  presupuesto: iniciarPresupuesto(),
  modal: false,
  gastos: localStorageGastos(),
  editarId: '',
  categoriaFiltrada: ''
}

const createGastoId = (termporalgasto: GastoTemporal): Gastos => {
  return {
    ...termporalgasto,
    id: uuidv4()
  }
}
export const presupuestoReducer = (
  state: presupuestoState = initialState,
  action: presupuestoAcciones
) => {
  switch (action.type) {
    case 'añadir-presupuesto':
      return {
        ...state,
        presupuesto: action.payload.presupuesto
      }
    case 'show-modal':

      return {
        ...state,
        modal: true
      }
    case 'hide-model':

      return {
        ...state,
        modal: false,
        editarId: ''
      }
    case 'añadir-gastos':

      const gasto = createGastoId(action.payload.gasto)
      return {
        ...state,
        gastos: [...state.gastos, gasto],
        modal: false
      }
    case 'eliminar-gasto':
      return {
        ...state,
        gastos: state.gastos.filter(gasto => gasto.id !== action.payload.id)
      }
    case 'recibir-id-gasto':
      return {
        ...state,
        editarId: action.payload.id,
        modal: true
      }
    case "actualizar-gasto":
      return {
        ...state,
        gastos: state.gastos.map(gasto => gasto.id === action.payload.gastos.id ?
          action.payload.gastos : gasto),
        modal: false,
        editarId: ''
      }
    case "resetear-app":
      return {
        ...state,
        presupuesto: 0,
        gastos: []
      }
    case "añadir-filtrado-categoria":
      return {
        ...state,
        categoriaFiltrada: action.payload.id
      }
    default:
      return state
  }
}
