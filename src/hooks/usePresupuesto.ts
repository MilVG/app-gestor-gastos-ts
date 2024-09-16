import { useContext } from "react";
import { PresupuestoContext } from "../context/PresupuestoContext";

export const usePresupuesto = () => {

  const context = useContext(PresupuestoContext)

  if (!context) {
    throw new Error('el usePresuspuesto debe usarse por medio de PresupuestoContext ')

  }
  return context

}
