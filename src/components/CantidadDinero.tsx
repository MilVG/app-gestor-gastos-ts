import { formartCurrency } from "../helpers"

type CantidadDineroProps = {
  label?: string,
  cantidad: number
}

export default function CantidadDinero({ label, cantidad }: CantidadDineroProps) {
  return (
    <div className="flex flex-row justify-between">
      <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
      </p>
      <span className="font-black text-black text-2xl">{formartCurrency(cantidad)}</span>
    </div>
  )
}

