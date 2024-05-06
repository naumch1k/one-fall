import styles from './MenuToggle.module.css'

interface IMenuToggle {
  isOpen: boolean
  className?: string
  onClick: () => void
}

export const MenuToggle = (props: IMenuToggle) => {
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