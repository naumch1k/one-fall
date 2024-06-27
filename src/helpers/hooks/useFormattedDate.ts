import { useState, useEffect } from 'react'
import { MONTHS } from '@/helpers/constants/months'

export const useFormattedDate = (date: string, elementType: string) => {
  const [formattedDate, setFormattedDate] = useState('')
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const todaysDate = new Date()

    const getDateFromString = new Date(date)

    const Year = getDateFromString.getFullYear()
    const Month = getDateFromString.getMonth()
    const Day = getDateFromString.getDate()

    const dayName = getDateFromString.toLocaleDateString('en-US', {
      weekday: 'long',
    })

    const isPastEvent = getDateFromString < todaysDate
    setIsPast(isPastEvent)

    if (elementType === 'PressCard') {
      setFormattedDate(`${dayName}, ${MONTHS[Month]}  ${Day}, ${Year}`)
    } else {
      setFormattedDate(`${MONTHS[Month]} ${Day}`)
    }
  }, [date, elementType])

  return { formattedDate, isPast }
}
