
import { useEffect, useMemo } from "react"
import PresupuestoForm from "./components/PresupuestoForm"
import { usePresupuesto } from "./hooks/usePresupuesto"
import PresupuestoDefinido from "./components/PresupuestoDefinido"
import AddGastosModal from "./components/AddGastosModal"
import GastosList from "./components/GastosList"
import FiltrarPorCategorias from "./components/FiltrarPorCategorias"

function App() {

  const { state } = usePresupuesto()

  const ValidDisplayShow_Hide = useMemo(() => state.presupuesto > 0, [state.presupuesto])

  useEffect(() => {
    localStorage.setItem('presupuesto', state.presupuesto.toString())
    localStorage.setItem('gastos', JSON.stringify(state.gastos))
  }, [state])
  return (
    <div>
      <header className="bg-blue-700">
        <h1 className="text-white font-bold uppercase text-3xl text-center p-3">App gestor de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {ValidDisplayShow_Hide ? <PresupuestoDefinido /> : <PresupuestoForm />}
      </div>

      {ValidDisplayShow_Hide && (
        <main className="max-w-3xl mx-auto py-10">
          <FiltrarPorCategorias />
          <GastosList />
          <AddGastosModal />
        </main>
      )}
    </div>
  )
}

export default App
