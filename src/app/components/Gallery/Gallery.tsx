'use client'

import Image from 'next/image'
import { LightboxButton } from '@/components/ui/LightboxButton/LightboxButton'
import { GalleryImagePreview } from '../GalleryImagePreview/GalleryImagePreview'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useGalleryImagePreview } from './hooks/useGalleryImagePreview'
import styles from './Gallery.module.css'

import data from './data.json'

export const Gallery = () => {
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)
  const {
    previewedItem,
    handleMouseEnter,
    handleMouseLeave,
    isPreviewing,
  } = useGalleryImagePreview()

  return (
    <section id='gallery' className={styles.root}>
      <h2 className='visuallyHidden'>Gallery</h2>
      <div className={styles.innerWrapper}>
        <ul className={styles.list}>
          {data.items.map(item => (
            <li key={item.id} className={styles.listItem}>
              <Image
                className={styles.image}
                src={item.imageUrl}
                alt={item.description}
                width={500}
                height={500}
              />
              <LightboxButton
                className={styles.lightboxButton}
                onClick={() => console.log('Click!')}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(item)}
                onBlur={handleMouseLeave}
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
  )
}
