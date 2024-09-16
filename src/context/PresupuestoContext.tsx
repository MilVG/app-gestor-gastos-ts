import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { initialState, presupuestoAcciones, presupuestoReducer, presupuestoState } from "../reducers/presupuesto-reducer"

type PresupuestoContextProps = {
  state: presupuestoState
  dispatch: Dispatch<presupuestoAcciones>
  totalGastos: number,
  DineroDisponible: number
}

type PresupuestoProviderProps = {
  children: ReactNode
}
export const PresupuestoContext = createContext<PresupuestoContextProps>(null!)

export const PresupuestoProvider = ({ children }: PresupuestoProviderProps) => {

  const [state, dispatch] = useReducer(presupuestoReducer, initialState)

  //variables de resumen de gastos
  const totalGastos = useMemo(() => state.gastos.reduce((total, gasto) => gasto.cantidad + total, 0), [state.gastos])
  const DineroDisponible = state.presupuesto - totalGastos

  return (

    <PresupuestoContext.Provider
      value={{
        state,
        dispatch,
        totalGastos,
        DineroDisponible
      }}
    >
      {children}
    </PresupuestoContext.Provider>

  )
}
