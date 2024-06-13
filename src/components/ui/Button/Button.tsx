import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button'
  view?: 'primary' | 'secondary'
  isLink?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  className?: string
}

export const Button = ({
  type = 'button',
  view = 'primary',
  isLink,
  href,
  target,
  disabled = false,
  className = '',
  children,
  ...restButtonProps
}: IButtonProps) => {
  const classes = `${styles.root} ${styles[view]} ${className}`

  return !isLink ? (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      {...restButtonProps}
    >
      {children}
    </button>
  ) : (
    <a className={classes} href={href} target={target}>
      {children}
    </a>
  )
}
