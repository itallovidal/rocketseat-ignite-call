export function convertStringToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number) // [08,00]
  return hours * 60 + minutes
}
