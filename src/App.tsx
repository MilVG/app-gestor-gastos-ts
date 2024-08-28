import PresupuestoForm from "./components/PresupuestoForm"

function App() {
  return (
    <>
      <header className="bg-blue-700">
        <h1 className="text-white font-bold uppercase text-3xl text-center p-3">App gestor de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <PresupuestoForm />
      </div>
    </>
  )
}

export default App
