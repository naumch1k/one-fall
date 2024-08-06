import { SliderDots } from '../SliderDots/SliderDots'
import { ArrowButton } from '../ArrowButton/ArrowButton'
import { useSlider } from './hooks/useSlider'
import 'keen-slider/keen-slider.min.css'
import styles from './Slider.module.css'

interface ISliderProps<T extends { id: string }> {
  border?: 'topBottom' | ''
  mode?: 'single' | 'multiple'
  items: T[]
  SlideComponent: (item: T, tabIndex: number, dataProps?: object) => JSX.Element
  dataProps?: object
}

export const Slider = <T extends { id: string }>({
  border = '',
  mode = 'multiple',
  items,
  SlideComponent,
}: ISliderProps<T>) => {
  const { sliderRef, instanceRef, currentSlideIndex, isSliderCreated } = useSlider(mode)

  const sliderListClasses = `${styles.list} ${border && styles[border]} keen-slider`

  return (
    <div className={styles.root} aria-label='Slider'>
      {isSliderCreated && instanceRef.current && (
        <div className={styles.controls}>
          <SliderDots
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
      <ul ref={sliderRef} className={sliderListClasses}>
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
