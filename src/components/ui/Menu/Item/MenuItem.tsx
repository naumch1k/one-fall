import Link from 'next/link'
import { useMenu } from '../Menu.context'
import { styles } from '../Menu.styles'

interface IMenuItemProps {
  id: string
  href: string
  text: string
  covert?: boolean
  current?: boolean
  className?: string
  onClick?: () => void
}

export const MenuItem = (props: IMenuItemProps) => {
  const { id, href, text, covert, current, className, onClick, ...restProps } =
    props
  const { type } = useMenu()

  const classes = `${styles[type].link} ${covert ? styles[type].covert : ''} ${current ? styles[type].current : ''} ${className || ''}`

  return (
    <li>
      <Link className={classes} href={href} onClick={onClick} {...restProps}>
        {text}
      </Link>
    </li>
  )
}
