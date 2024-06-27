'use client'

import Image from 'next/image'
import { useFormattedDate } from '../../../../helpers/hooks/useFormattedDate'
import { ArrowLink } from '../../ArrowLink/ArrowLink'
import styles from './PressCardItem.module.css'

interface IPressCardItemProps {
  id: string
  title: string
  outline: string
  publisher: string
  publishDate: string
  publishUrl: string
  imageUrl: string
}

export const PressCardItem = ({
  id,
  title,
  outline,
  publisher,
  publishDate,
  publishUrl,
  imageUrl,
}: IPressCardItemProps) => {
  const { formattedDate } = useFormattedDate(publishDate, 'PressCard')

  return (
    <li className={styles.root}>
      <span className={styles.date}>{formattedDate}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.outline}>{outline.slice(0, 200) + '...'}</p>
      <ArrowLink
        href={publishUrl}
        text={`Read on ${publisher}`}
        className={styles.link}
      />
      {/* <Image
        width={400}
        height={300}
        src={imageUrl}
        alt='One Fall article cover'
      /> */}
      <div className={styles.imgWrapper}>
        <img
          src={imageUrl}
          alt='One Fall article cover'
          className={styles.img}
        />
      </div>
    </li>
  )
}
