import { AnchorHTMLAttributes } from 'react'

import styles from './ArrowLink.module.css'

interface IArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  text: string
}

export const ArrowLink = ({
  className,
  href,
  target = '_blank',
  text,
}: IArrowLinkProps) => {
  const classes = `${className ?? ''} ${styles.root}`

  return (
    <a
      className={classes}
      href={href}
      target={target}
      rel='noopener noreferrer'
    >
      <span className={styles.text}>{text}</span>
      <div className={styles.arrows} aria-hidden>
        <span className={styles.arrow}>&#8594;</span>
        <span className={styles.arrow}>&#8594;</span>
      </div>
    </a>
  )
}
