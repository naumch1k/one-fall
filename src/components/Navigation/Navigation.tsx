'use client'

import { Menu } from '../ui/Menu/Menu'
import { useMainNavigation } from './hooks/useNavigation'
import { mainNavigationItems } from '@/helpers/constants/mainNavigationItems'
import styles from './Navigation.module.css'

export const Navigation = () => {
  const { isCovert, currentLink } = useMainNavigation()

  return (
    <nav className={styles.root}>
      <Menu type='main-navigation'>
        {mainNavigationItems.map(({ id, text, href }) => (
          <Menu.Item
            key={id}
            id={id}
            href={href}
            text={text}
            covert={isCovert}
            current={currentLink === id}
          />
        ))}
      </Menu>
    </nav>
  )
}
