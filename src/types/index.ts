export type Gastos = {
  id: string
  nombreGasto: string
  cantidad: number
  categoria: string
  fecha: Value
}

export type GastoTemporal = Omit<Gastos, 'id'>

//type provenientes de la libreria react-date-picker
export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Categoria = {
  id: string
  name: string
  icon: string
}

