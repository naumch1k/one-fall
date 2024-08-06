import { AnchorHTMLAttributes } from 'react'

import styles from './ArrowLink.module.css'

interface IArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  text: string
}

export const ArrowLink = ({
  className = '',
  href,
  target = '_blank',
  text,
  ...props
}: IArrowLinkProps) => (
  <a
    className={`${styles.root} ${className}`}
    href={href}
    target={target}
    rel='noopener noreferrer'
    { ...props}
    >
    <span className={styles.text}>{text}</span>
    <div className={styles.arrows} aria-hidden>
      <span className={styles.arrow}>➞</span>
      <span className={styles.arrow}>➞</span>
    </div>
  </a>
)
