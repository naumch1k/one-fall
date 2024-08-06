import Image from 'next/image'
import { FormattedDate } from '@/components/ui/FormattedDate/FormattedDate'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'
import { IPressCard } from '@/helpers/types'
import styles from './PressCard.module.css'

export const PressCard = ({
  title,
  outline,
  publisher,
  publishDate,
  publishUrl,
  imageUrl,
}: IPressCard) => {
  return (
    <article className={styles.root}>
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
            fill
            sizes='(max-width: 767px) 100vw, (max-width: 1179px) 50vw, 30vw'
            src={imageUrl}
            alt='One Fall article cover'
            className={styles.img}
          />
        </div>
      </div>
    </article>
  )
}
