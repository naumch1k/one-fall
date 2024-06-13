import Image from 'next/image'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import styles from './MerchCard.module.css'

interface IMerchCardProps {
  id: string
  title: string
  description: string
  price: number
  purchaseUrl: string
  image: string
  onImageClick: (id: string) => void
}

export const MerchCard = ({
  id,
  title,
  description,
  price,
  purchaseUrl,
  image,
  onImageClick,
}: IMerchCardProps) => {
  const isMobile = useMediaQuery(`(max-width: 480px)`)

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={image}
          alt={title}
          width={280}
          height={280}
        />
        {!isMobile && (
          <button
            className={styles.button}
            type='button'
            aria-label='Open full sized image'
            onClick={() => onImageClick(id)}
          >
            <Icon glyph='eye' className={styles.eyeIcon} />
          </button>
        )}
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>{`${price} USD`}</span>
        <Button
          view='secondary'
          isLink
          href={purchaseUrl}
          rel='noopener noreferrer'
          target='_blank'
        >
          Buy on Bandcamp
        </Button>
      </div>
    </div>
  )
}
