export const getFormattedMinutes = (totalSeconds: number) => {
  if (!totalSeconds || isNaN(totalSeconds)) return '00'

  const minutes = Math.floor(Math.floor(totalSeconds) / 60)
  return minutes < 10 ? `0${minutes}` : `${minutes}`
}

export const getFormattedSeconds = (totalSeconds: number) => {
  if (!totalSeconds || isNaN(totalSeconds)) return '00'

  const seconds = Math.floor(Math.floor(totalSeconds) % 60)
  return seconds < 10 ? `0${seconds}` : `${seconds}`
}