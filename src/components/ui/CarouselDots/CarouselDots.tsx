import styles from './CarouselDots.module.css'

interface ICarouselDotsProps {
  className?: string
  count: number
  currentSlideIndex: number
  onClick: (index: number) => void
}

export const CarouselDots = ({
  className = '',
  count,
  currentSlideIndex,
  onClick,
}: ICarouselDotsProps) => {
  const renderCarouselDot = (index: number) => {
    return (
      <button
        className={`${styles.dot} ${className}`}
        key={index}
        onClick={() => onClick(index)}
        aria-label={`View Slide ${index + 1}`}
        disabled={currentSlideIndex === index}
      />
    )
  }

  return (
    <div className={styles.root}>
      {Array.from(Array(count).keys()).map(index => renderCarouselDot(index))}
    </div>
  )
}
