export function formartCurrency(cantidad: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cantidad)
}

export function formatDate(dateSrt: string): string {
  const dateObj = new Date(dateSrt)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}
