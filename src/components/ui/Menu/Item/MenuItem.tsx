import Link from 'next/link'
import { useMenu } from '../Menu.context'
import { styles } from '../Menu.styles'

interface IMenuItemProps {
  id: string
  href: string
  text: string
  activeLink?: string
  className?: string
  onClick?: () => void
}

export const MenuItem = (props: IMenuItemProps) => {
  const {
    id,
    href,
    text,
    activeLink,
    className,
    onClick,
    ...restProps
  } = props

  const { type } = useMenu()

  return (
    <li className={`${styles[type].item}`}>
      <Link
        className={`
          ${styles[type].link}
          ${activeLink === 'hero' 
            ? styles[type].default 
            : activeLink === id 
              ? styles[type].active 
              : styles[type].inactive
          }
          ${className}
        `}
        href={href}
        onClick={onClick}
        {...restProps}
      >
        {text}
      </Link>
    </li>
  )
}