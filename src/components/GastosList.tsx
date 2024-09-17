import { useMemo } from "react"
import { usePresupuesto } from "../hooks/usePresupuesto"
import Gasto from "./Gasto"


export default function GastosList() {

  const { state } = usePresupuesto()

  const filtrarGastosListado = state.categoriaFiltrada ? state.gastos.filter(
    gasto => gasto.categoria === state.categoriaFiltrada) : state.gastos

  const datosvacios = useMemo(() => filtrarGastosListado.length === 0, [filtrarGastosListado])
  return (
    <div className="mt-10">
      {datosvacios ? <p className="text-gray-600 text-2xl font-bold"> No Hay gastos</p> : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5"> Listado de Gastos. </p>

          {filtrarGastosListado.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
            />
          ))}
        </>
      )}
    </div>
  )
}

