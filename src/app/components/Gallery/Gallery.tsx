'use client'

import Image from 'next/image'
import { GalleryImage } from '../GalleryImage/GalleryImage'
import { GalleryImagePreview } from '../GalleryImagePreview/GalleryImagePreview'
import { Modal } from '@/components/ui/Modal/Modal'
import { ImageCarousel } from '@/components/ui/ImageCarousel/ImageCarousel'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useGalleryImages } from './hooks/useGalleryImages'
import { useGalleryImagePreview } from './hooks/useGalleryImagePreview'
import { useFullscreenImageView } from '@/helpers/hooks/useFullscreenImageView'
import { TImage } from '@/helpers/types'
import styles from './Gallery.module.css'

import data from './data.json'

export const Gallery = () => {
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)
  const imagesToRender = useGalleryImages(data.items)
  const {
    previewedItem,
    handleMouseEnter,
    handleMouseLeave,
    isPreviewing,
  } = useGalleryImagePreview()
  const {
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    currentItemIndex,
    handleImageClick,
  } = useFullscreenImageView<TImage>(data.items)

  return (
    <>
      <section id='gallery' className={styles.root}>
        <h2 className='visuallyHidden'>Gallery</h2>
        <div className={styles.innerWrapper}>
          <ul className={styles.list}>
            {imagesToRender.map(item => (
              <li key={item.id} className={styles.listItem}>
                <GalleryImage
                  item={item}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onImageClick={handleImageClick}
                  buttonClassName={styles.lightboxButton}
                />
              </li>
            ))}
            {isDesktop && previewedItem && (
              <GalleryImagePreview
                currentItem={previewedItem}
                isVisible={isPreviewing}
              />
            )}
          </ul>
        </div>
      </section>
      {currentItemIndex !== undefined && (
        <Modal
          variant='lightbox'
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <ImageCarousel
            images={imagesToRender}
            currentImageIndex={currentItemIndex}
            SlideComponent={(image: TImage) => (
              <Image
                className={styles.lightboxImage}
                src={image.imageUrl}
                alt={image.description}
                width={1200}
                height={800}
              />
            )}
          />
        </Modal>
      )}
    </>
  )
}
