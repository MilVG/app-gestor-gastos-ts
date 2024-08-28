import { ChangeEvent, useMemo, useState } from "react"


export default function PresupuestoForm() {

  const [presupuesto, setPresupuesto] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setPresupuesto(e.target.valueAsNumber)
  }
  const validarInputPresupuesto = useMemo(() => {
    //console.log(isNaN(presupuesto));

    return isNaN(presupuesto) || presupuesto <= 0;

  }, [presupuesto])
  return (
    <form className="space-y-5 py-2 px-2">
      <div className=" flex flex-col space-y-5">
        <label htmlFor="presupuesto-input" className="text-4xl text-blue-600 font-bold text-center">
          Definir presupuesto
        </label>
        <input
          type="number"
          id="presupuesto-input"
          placeholder="S/.300"
          name="presupuesto-input"
          className="w-full bg-white border-gray-200 p-2"
          value={presupuesto || ''}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value='Inicar Presupuesto'
        className=" bg-blue-600 text-white font-bold rounded-lg w-full p-3 uppercase  
        cursor-pointer hover:bg-blue-700 disabled:opacity-40"
        disabled={validarInputPresupuesto}
      />
    </form>
  )
}

