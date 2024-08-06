import Image from 'next/image'
import { TImage } from '@/helpers/types'
import styles from './GalleryImagePreview.module.css'

interface IGalleryImagePreviewProps {
  currentItem: TImage
  isVisible: boolean
}

export const GalleryImagePreview = ({
  currentItem,
  isVisible,
}: IGalleryImagePreviewProps) => {
  return (
    <div className={`${styles.root}`}>
      <Image
        className={`${styles.image} ${isVisible ? styles.isVisible : ''}`}
        src={currentItem.imageUrl}
        alt={currentItem.description}
        width={1303}
        height={643}
        priority
        loading='eager'
      />
    </div>
  )
}
