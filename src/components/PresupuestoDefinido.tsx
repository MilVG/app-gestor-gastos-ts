import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { usePresupuesto } from "../hooks/usePresupuesto"
import CantidadDinero from "./CantidadDinero"

export default function PresupuestoDefinido() {

  const { state, totalGastos, DineroDisponible, dispatch } = usePresupuesto()

  const porcentajeGastosProgres = +((totalGastos / state.presupuesto) * 100).toFixed(2)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={porcentajeGastosProgres}
          styles={buildStyles({
            pathColor: porcentajeGastosProgres === 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: porcentajeGastosProgres === 100 ? '#DC2626' : '#3b82f6',
          })}
          text={` ${porcentajeGastosProgres}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8 ">
        <button
          type='button'
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({ type: 'resetear-app' })}
        >
          Resetear App
        </button>
        <div className="w-full">
          <CantidadDinero
            label="Presupuesto"
            cantidad={state.presupuesto}
          />
          <CantidadDinero
            label="Disponible"
            cantidad={DineroDisponible}
          />
          <CantidadDinero
            label="Gastado"
            cantidad={totalGastos}
          />
        </div>

      </div>
    </div>
  )
}

