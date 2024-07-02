'use client'

import Image from 'next/image'
import { useFormattedDate } from '../../../../helpers/hooks/useFormattedDate'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'

import { IPressCard } from '@/helpers/types/pressItem'
import styles from './PressCardItem.module.css'

export const PressCardItem = ({
  title,
  outline,
  publisher,
  publishDate,
  publishUrl,
  imageUrl,
}: IPressCard) => {
  const { formattedDate } = useFormattedDate(publishDate, 'PressCard')

  return (
    <li className={styles.root}>
      <div className={styles.header}>
        <span className={styles.date}>{formattedDate}</span>
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
