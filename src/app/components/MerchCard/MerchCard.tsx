import Image from 'next/image'
import { LightboxButton } from '@/components/ui/LightboxButton/LightboxButton'
import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'
import { useMediaQuery } from '@/helpers/hooks'
import styles from './MerchCard.module.css'

interface IMerchCardProps {
  id: string
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
  description,
  price,
  purchaseUrl,
  imageUrl,
  onImageClick,
}: IMerchCardProps) => {
  const isMobile = useMediaQuery(`(max-width: 480px)`)

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={title}
          width={280}
          height={280}
        />
        {!isMobile && (
          <LightboxButton
            className={styles.lightboxButton}
            onClick={() => onImageClick(id)}
          />
        )}
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>{`${price} USD`}</span>
        <ArrowLink href={purchaseUrl} text='Buy on Bandcamp' />
      </div>
    </div>
  )
}
