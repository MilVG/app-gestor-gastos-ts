import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GastoTemporal, Value } from "../types"
import { datoscategorias } from "../datos/categorias";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMensaje from "./ErrorMensaje";
import { usePresupuesto } from "../hooks/usePresupuesto";


export default function RegistroGastosForm() {

  const initialstate = {
    cantidad: 0,
    nombreGasto: '',
    categoria: '',
    fecha: new Date()

  }

  const [gasto, setGasto] = useState<GastoTemporal>(initialstate)

  const [cantidadPrevia, setCatidadPrevia] = useState(0)

  const [error, setError] = useState('')

  const { dispatch, state, DineroDisponible } = usePresupuesto()

  useEffect(() => {
    if (state.editarId) {
      const gastoEditando = state.gastos.filter(gastoActual => gastoActual.id === state.editarId)[0]
      setGasto(gastoEditando)
      setCatidadPrevia(gastoEditando.cantidad)
    }
  }, [state.editarId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const verficarcantidad = ['cantidad'].includes(name)

    setGasto({
      ...gasto,
      [name]: verficarcantidad ? Number(value) : value
    })

  }
  const handleChangeDate = (value: Value) => {
    setGasto({
      ...gasto,
      fecha: value
    })

  }

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(gasto).includes('')) {
      setError('Todos los campos son obligatorios ')
      return
    }

    //validar para que no me pase del usePresupuesto
    if ((gasto.cantidad - cantidadPrevia) > DineroDisponible) {
      setError('No se te permiete agregar mas gastos Rebasaste el Presupuesto')
      return
    }

    //agregar o Actualizar el gasto
    if (state.editarId) {
      dispatch({ type: 'actualizar-gasto', payload: { gastos: { id: state.editarId, ...gasto } } })

    } else {
      dispatch({ type: 'añadir-gastos', payload: { gasto } })

    }

    //reinciar campos del formulario
    setGasto(initialstate)
    setCatidadPrevia(0)
  }
  return (
    <form className="space-y-5" onSubmit={handlesubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
      >{state.editarId ? 'Actualizar Gasto' : 'Nuevo Gasto'}</legend>
      {error && <ErrorMensaje>{error}</ErrorMensaje>}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="nombreGasto"
          className="text-xl"
        >Nombre Gasto</label>
        <input
          type="text"
          id="nombreGasto"
          placeholder="Añade el nombre del Gasto"
          className="bg-slate-100 p-2"
          name="nombreGasto"
          value={gasto.nombreGasto}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="cantidad"
          className="text-xl"
        >Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          placeholder="Añade la cantidad del gasto ejm: 300"
          className="bg-slate-100 p-2"
          name="cantidad"
          value={gasto.cantidad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="categoria"
          className="text-xl"
        >Categoria:</label>
        <select
          id="categoria"
          className="bg-slate-100 p-2"
          name="categoria"
          onChange={handleChange}
          value={gasto.categoria}
        >
          <option value="">--seleccione--</option>
          {datoscategorias.map(categoria => (
            <option
              key={categoria.id}
              value={categoria.id}
            >{categoria.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-xl"
        >Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={gasto.fecha}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editarId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  )
}

