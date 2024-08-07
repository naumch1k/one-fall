import { AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { Icon } from '../../Icon/Icon'
import { useMenu } from '../Menu.context'
import icons from '../../../../../public/images/icons'
import { styles } from '../Menu.styles'

interface IMenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  id?: string
  href: string
  text: string
  iconGlyph?: keyof typeof icons
  covert?: boolean
  current?: boolean
  className?: string
  onClick?: () => void
}

export const MenuItem = ({
  id,
  href,
  text,
  iconGlyph,
  covert,
  current,
  className,
  onClick,
  ...restProps
}: IMenuItemProps) => {
  const { type } = useMenu()

  const classes = `${styles[type].link} ${covert ? styles[type].covert : ''} ${current ? styles[type].current : ''} ${className || ''}`

  const iconLinkElement = (
    <Link
      className={classes}
      href={href}
      aria-label={`Go to ONE FALL ${text}`}
      {...restProps}
    >
      <Icon glyph={iconGlyph as keyof typeof icons} width='100%' height='100%' />
    </Link>
  )

  return (
    <li>
      {iconGlyph ? (
        iconLinkElement
      ) : (
        <Link
          className={classes}
          href={href}
          tabIndex={current ? -1 : 0}
          onClick={onClick}
          {...restProps}
        >
          {text}
        </Link>
      )}
    </li>
  )
}
