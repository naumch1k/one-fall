import Image from 'next/image'
import { LightboxButton } from '@/components/ui/LightboxButton/LightboxButton'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import styles from './MerchCard.module.css'

interface IMerchCardProps {
  id: string
  type: string
  title: string
  description: string
  price: number
  purchaseUrl: string
  imageUrl: string
  onImageClick: (id: string) => void
}

export const MerchCard = ({
  id,
  title,
  type,
  description,
  price,
  purchaseUrl,
  imageUrl,
  onImageClick,
}: IMerchCardProps) => {
  const isTablet = useMediaQuery(`(max-width: 768px)`)

  return (
    <div className={styles.root}>
      <span className={styles.type}>{type}</span>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1272px) 50vw, 33vw'
        />
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {isTablet && (
          <>
            <p className={styles.description}>
              Price: <span className={styles.price}>{price} USD</span>
            </p>
            <ArrowLink
              className={styles.link}
              href={purchaseUrl}
              text='Buy on Bandcamp'
            />
          </>
        )}
      </div>
      {!isTablet && (
        <LightboxButton
          className={styles.lightboxButton}
          onClick={() => onImageClick(id)}
        />
      )}
    </div>
  )
}
