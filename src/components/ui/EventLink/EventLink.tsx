'use client'

import { useEventLink } from './hooks/useEventLink'
import { IEvent } from '@/helpers/types'
import styles from './EventLink.module.css'

export const EventLink = ({ 
  url,
  date,
  city,
  venue,
}: IEvent) => {
  const { formattedDate, isPast } = useEventLink(date)

  const classes = `${styles.root} ${isPast ? styles.isPast : ''}`

  if (!url) {
    return (
      <div className={classes}>
        <span className={styles.date}>{formattedDate}</span>
        <span className={styles.city}>{city}</span>
        <span className={styles.venue}>{venue}</span>
      </div>
    )
  }

  return (
    <a 
      className={classes}
      href={url}
      rel='noopener noreferrer'
      target='_blank'
    >
      <span className={styles.date}>{formattedDate}</span>
      <span className={styles.city}>{city}</span>
      <span className={styles.venue}>{venue}</span>
    </a>
  )
}