import type { ButtonHTMLAttributes } from 'react'
import { Icon, IIconProps } from '../Icon/Icon'
import styles from './IconButton.module.css'

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button'
  icon: IIconProps['glyph']
  ariaLabel: string
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export const IconButton = ({
  type = 'button',
  icon,
  ariaLabel,
  disabled = false,
  className = '',
  onClick,
}: IIconButtonProps) => {
  const classes = `${styles.root} ${className}`

  return (
    <button
      className={classes}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon glyph={icon} width='100%' height='100%' />
    </button>
  )
}
