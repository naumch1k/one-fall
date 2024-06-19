import { MutableRefObject } from 'react'
import Image from 'next/image'
import { IGalleryImage } from '@/helpers/types'
import styles from './GalleryImagePreview.module.css'

interface IGalleryImagePreviewProps {
  currentItem: IGalleryImage
  isVisible: boolean
  previewImageRef: MutableRefObject<HTMLImageElement | null>
}

export const GalleryImagePreview = ({
  currentItem,
  isVisible,
  previewImageRef,
}: IGalleryImagePreviewProps) => {
  return (
    <div className={`${styles.root}`}>
      <Image
        ref={previewImageRef}
        className={`${styles.image} ${isVisible ? styles.isVisible : ''}`}
        src={currentItem.url}
        alt={currentItem.description}
        width={1303}
        height={643}
        priority
        loading='eager'
      />
    </div>
  )
}
