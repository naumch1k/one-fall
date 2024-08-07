'use client'

import { FormattedDate } from '../FormattedDate/FormattedDate'
import { IEvent } from '@/helpers/types'
import styles from './EventLink.module.css'

export const EventLink = ({ url, date, city, venue }: IEvent) => {
  const isPast = new Date(date) < new Date()

  const classes = `${styles.root} ${isPast ? styles.isPast : ''}`

  if (!url) {
    return (
      <div className={classes}>
        <FormattedDate
          dateString={date}
          outputFormat='month dd'
          className={styles.date}
        />
        <span className={styles.city}>{city}</span>
        <span className={styles.venue}>{venue}</span>
      </div>
    )
  }

  return (
    <a
      className={classes}
      href={url}
      tabIndex={isPast ? -1 : 0}
      rel='noopener noreferrer'
      target='_blank'
    >
      <FormattedDate
        dateString={date}
        outputFormat='month dd'
        className={styles.date}
      />
      <span className={styles.city}>{city}</span>
      <span className={styles.venue}>{venue}</span>
    </a>
  )
}
