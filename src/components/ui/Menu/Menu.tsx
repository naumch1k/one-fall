import { MenuProvider, MenuType } from './Menu.context'
import { MenuItem } from './Item/MenuItem'
import { styles } from './Menu.styles'

interface IMenuProps {
  type: MenuType
  className?: string
  children: React.ReactNode
}

const Component = (props: IMenuProps): JSX.Element => {
  const { 
    type, 
    className,
    children,
  } = props

  return (
    <ul className={`${styles[type].menu} ${className}`}>
      <MenuProvider value={{ type }}>
        {children}
      </MenuProvider>
    </ul>
  )
}

export const Menu = Object.assign(Component, {
  Item: MenuItem,
})