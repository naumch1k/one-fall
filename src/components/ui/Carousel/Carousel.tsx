import { CarouselDots } from '../CarouselDots/CarouselDots'
import { ArrowButton } from '../ArrowButton/ArrowButton'
import { useCarousel } from './hooks/useCarousel'
import 'keen-slider/keen-slider.min.css'
import styles from './Carousel.module.css'

interface ICarouselProps<T extends { id: string }> {
  border?: 'topBottom' | ''
  mode?: 'single' | 'multiple'
  items: T[]
  SlideComponent: (item: T, tabIndex: number, dataProps?: object) => JSX.Element
  dataProps?: object
}

export const Carousel = <T extends { id: string }>({
  border = '',
  mode = 'multiple',
  items,
  SlideComponent,
}: ICarouselProps<T>) => {
  const { carouselRef, instanceRef, currentSlideIndex, isCarouselCreated } = useCarousel(mode)

  const carouselListClasses = `${styles.list} ${border && styles[border]} keen-slider`

  return (
    <div className={styles.root} aria-label='Slider'>
      {isCarouselCreated && instanceRef.current && (
        <div className={styles.controls}>
          <CarouselDots
            count={items.length}
            currentSlideIndex={currentSlideIndex}
            onClick={index => instanceRef.current?.moveToIdx(index)}
          />
          <div className={styles.arrows}>
            <ArrowButton
              direction='left'
              aria-label='View Previous Slide'
              onClick={instanceRef.current?.prev}
            />
            <ArrowButton
              direction='right'
              aria-label='View Next Slide'
              onClick={instanceRef.current?.next}
            />
          </div>
        </div>
      )}
      <ul ref={carouselRef} className={carouselListClasses}>
        {items.map((item, index) => {
          const isCurrent = currentSlideIndex === index
          const classes = `${styles.slide} ${isCurrent ? styles.current : ''} keen-slider__slide`

          return (
            <li key={item.id} className={classes} aria-hidden={!isCurrent}>
              {SlideComponent(item, isCurrent ? 0 : -1)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
