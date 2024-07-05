export const getFormatDateParts = (date: string) => {
  const Year = new Date(date).getFullYear()
  const Month = new Date(date).getMonth()
  const Day = new Date(date).getDate()

  return { Year, Month, Day }
}
