import { useState, useEffect } from 'react'
import { MONTHS } from '@/helpers/constants/months'

export const useEventLink = (date: string) => {
  const [formattedDate, setFormattedDate] = useState('')
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const todaysDate = new Date()
    const eventDate = new Date(date)
    const eventMonth = eventDate.getMonth()
    const eventDay = eventDate.getDate()

    const isPastEvent = eventDate < todaysDate

    setIsPast(isPastEvent)
    setFormattedDate(`${MONTHS[eventMonth]} ${eventDay}`)
  }, [date])

  return { formattedDate, isPast }
}
