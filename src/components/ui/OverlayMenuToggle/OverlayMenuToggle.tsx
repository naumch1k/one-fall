import styles from './OverlayMenuToggle.module.css'

interface IOverlayMenuToggle {
  isOpen: boolean
  className?: string
  onClick: () => void
}

export const OverlayMenuToggle = (props: IOverlayMenuToggle) => {
  const { isOpen, className, onClick } = props

  return (
    <button
      className={`${styles.root} ${className}`}
      role='button'
      aria-label={isOpen ? 'Open Menu' : 'Close Menu'}
      onClick={onClick}
    >
      {isOpen ? 'Close' : 'Menu'}
    </button>
  )
}