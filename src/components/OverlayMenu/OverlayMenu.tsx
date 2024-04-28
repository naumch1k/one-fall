'use client'

// import { anton } from '@/app/layout'
import { Menu } from '../ui/Menu/Menu'
import { MenuToggle } from '../ui/MenuToggle/MenuToggle'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useOverlayMenu } from './hooks/useOverlayMenu'
import { mainNavigationItems } from '@/helpers/mainNavigationItems'
import styles from './OverlayMenu.module.css'


export const OverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 767px)`)
  const {
    isOverlayMenuOpen,
    toggleOverlayMenu,
  } = useOverlayMenu()

  return (
    isMobile ? (    
      <>
        <div className={`${styles.root} ${isOverlayMenuOpen ? `${styles.isOpen}` : ''}`}>
          <nav>
            <Menu type='overlay-navigation'>
              {mainNavigationItems.map(({ id, text, href }) => (
                <Menu.Item
                  key={id}
                  id={id}
                  href={href}
                  text={text}
                  // className={`${anton.className}`}
                  onClick={toggleOverlayMenu}
                />
              ))}
            </Menu>
          </nav>
        </div>
        <MenuToggle
          isOpen={isOverlayMenuOpen}
          className={styles.toggle}
          onClick={toggleOverlayMenu}
        />
      </>
    ) : null
  )
}