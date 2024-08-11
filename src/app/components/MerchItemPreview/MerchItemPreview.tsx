import Image from 'next/image'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'
import { IMerchItem } from '@/helpers/types'
import styles from './MerchItemPreview.module.css'

export const MerchItemPreview = ({
  title,
  type,
  fullDescription,
  price,
  purchaseUrl,
  imageUrl,
  fullImageUrl,
}: IMerchItem) => {
  return (
    <article className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={fullImageUrl ? fullImageUrl : imageUrl}
          alt={title}
          fill
        />
      </div>
      <div className={styles.content}>
        <span className={styles.type}>{type}</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.paragraphs}>
          {fullDescription.map((paragraph: string, index: number) => (
            <p key={index} className={styles.paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className={styles.paragraph}>
          Price: <span className={styles.price}>{price} USD</span>
        </p>
        <ArrowLink
          className={styles.link}
          href={purchaseUrl}
          text='Buy on Bandcamp'
        />
      </div>
    </article>
  )
}
