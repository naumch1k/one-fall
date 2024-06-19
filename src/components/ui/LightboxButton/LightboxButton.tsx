import { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './LightboxButton.module.css'

interface ILightboxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  ariaLabel?: string
  onClick: () => void
}

export const LightboxButton = ({
  className = '',
  ariaLabel = 'Open full sized image',
  onClick,
  ...restProps
}: ILightboxButtonProps) => {
  return (
    <button
      className={`${styles.root} ${className}`}
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      {...restProps}
    >
      <Icon glyph='eye' className={styles.eyeIcon} />
    </button>
  )
}
