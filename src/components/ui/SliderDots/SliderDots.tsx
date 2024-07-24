import styles from './SliderDots.module.css'

interface ISliderDotsProps {
  className?: string
  count: number
  currentSlideIndex: number
  onClick: (index: number) => void
}

export const SliderDots = ({
  className = '',
  count,
  currentSlideIndex,
  onClick,
}: ISliderDotsProps) => {
  const renderSliderDot = (index: number) => {
    return (
      <button
        className={`${styles.dot} ${className}`}
        key={index}
        onClick={() => onClick(index)}
        aria-label={`Slide ${index + 1}`}
        disabled={currentSlideIndex === index}
      />
    )
  }

  return (
    <div className={styles.root}>
      {Array.from(Array(count).keys()).map(index => renderSliderDot(index))}
    </div>
  )
}
