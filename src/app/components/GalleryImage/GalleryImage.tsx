import Image from 'next/image'
import { LightboxButton } from '@/components/ui/LightboxButton/LightboxButton'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { TImage } from '@/helpers/types'
import styles from './GalleryImage.module.css'

interface IGalleryImageProps {
  item: TImage
  onMouseEnter: (item: TImage) => void
  onMouseLeave: () => void
  onImageClick: (id: string) => void
  buttonClassName?: string
}

export const GalleryImage = ({
  item,
  onMouseEnter,
  onMouseLeave,
  onImageClick,
  buttonClassName,
}: IGalleryImageProps) => {
  const isTablet = useMediaQuery(`(min-width: 768px)`)

  return (
    <>
      <Image
        className={styles.root}
        src={item.imageUrl}
        alt={item.description}
        width={575}
        height={575}
      />
      {isTablet && (
        <LightboxButton
          className={buttonClassName}
          onClick={() => onImageClick(item.id)}
          onMouseEnter={() => onMouseEnter(item)}
          onMouseLeave={onMouseLeave}
          onFocus={() => onMouseEnter(item)}
          onBlur={onMouseLeave}
        />
      )}
    </>
  )
}
