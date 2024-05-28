import styles from './OverlayToggle.module.css'

interface IOverlayToggle {
  ariaLabel?: string
  className?: string
  onClick: () => void
  children: React.ReactNode
}

export const OverlayToggle = ({
  ariaLabel,
  className,
  onClick,
  children,
}: IOverlayToggle) => (
  <button
    className={`${styles.root} ${className}`}
    type='button'
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {children}
  </button>
)