import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './CloseButton.module.css'

interface ICloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string
  onClick: () => void
  className?: string
}

export const CloseButton = ({
  ariaLabel,
  onClick,
  className = '',
  ...buttonProps
}: ICloseButtonProps) => (
  <button
    className={`${styles.root} ${className}`}
    type='button'
    aria-label={ariaLabel}
    onClick={onClick}
    {...buttonProps}
  >
    <Icon glyph='x' width='100%' height='100%' />
  </button>
)
