'use client'

import Image from 'next/image'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'

import { IPressCard } from '@/helpers/types/pressItem'
import styles from './PressCardItem.module.css'
import { FormattedDate } from '@/components/ui/FormattedDate/FormattedDate'

export const PressCardItem = ({
  title,
  outline,
  publisher,
  publishDate,
  publishUrl,
  imageUrl,
}: IPressCard) => {
  return (
    <li className={styles.root}>
      <div className={styles.header}>
        <FormattedDate
          dateString={publishDate}
          outputFormat='month dd, yyyy'
          className={styles.date}
        />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.outline}>{outline.slice(0, 200) + '...'}</p>
        <ArrowLink
          href={publishUrl}
          text={`Read on ${publisher}`}
          className={styles.link}
        />

        <div className={styles.imgWrapper}>
          <Image
            fill={true}
            src={imageUrl}
            alt='One Fall article cover'
            className={styles.img}
          />
        </div>
      </div>
    </li>
  )
}
