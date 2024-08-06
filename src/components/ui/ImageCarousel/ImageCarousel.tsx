import { ArrowButton } from '../ArrowButton/ArrowButton'
import { useImageCarousel } from './hooks/useImageCarousel'
import { TImage, TImageCarousel } from '@/helpers/types'
import styles from './ImageCarousel.module.css'

interface IImageCarouselProps<T extends TImage> extends TImageCarousel<T> {
  SlideComponent: (item: T) => JSX.Element
}

export const ImageCarousel = <T extends TImage>({
  images,
  currentImageIndex,
  SlideComponent,
}: IImageCarouselProps<T>) => {
  const {
    sliderRef,
    instanceRef,
    isSliderCreated,
    opacities,
  } = useImageCarousel({ images, currentImageIndex })

  return (
    <div className={styles.root} aria-label='Image Slider'>
      <ul ref={sliderRef} className={`${styles.slides}`}>
        {images.map((image, index) => (
          <li
            key={image.id}
            className={`${styles.slide}`}
            style={{ opacity: opacities[index] }}
          >
            {SlideComponent(image)}
          </li>
        ))}
      </ul>
      {isSliderCreated && instanceRef.current && (
        <>
          <ArrowButton
            className={`${styles.arrowButton} ${styles.left}`}
            direction='left'
            aria-label='View Previous Image'
            onClick={instanceRef.current?.prev}
          />
          <ArrowButton
            className={`${styles.arrowButton} ${styles.right}`}
            direction='right'
            aria-label='View Next Image'
            onClick={instanceRef.current?.next}
          />
        </>
      )}
    </div>
  )
}
