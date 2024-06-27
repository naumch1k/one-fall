'use client'

import { IEvent } from '@/helpers/types'
import styles from './EventLink.module.css'
import { useFormattedDate } from '../../../helpers/hooks/useFormattedDate'

export const EventLink = ({ url, date, city, venue }: IEvent) => {
  const { formattedDate, isPast } = useFormattedDate(date, 'EventLink')

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
    <a className={classes} href={url} rel='noopener noreferrer' target='_blank'>
      <span className={styles.date}>{formattedDate}</span>
      <span className={styles.city}>{city}</span>
      <span className={styles.venue}>{venue}</span>
    </a>
  )
}
