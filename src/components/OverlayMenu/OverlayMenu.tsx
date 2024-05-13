'use client'

import { Menu } from '../ui/Menu/Menu'
import { OverlayMenuToggle } from '../ui/OverlayMenuToggle/OverlayMenuToggle'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useOverlayMenu } from './hooks/useOverlayMenu'
import { mainNavigationItems } from '@/helpers/mainNavigationItems'
import styles from './OverlayMenu.module.css'


export const OverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const { isOverlayMenuOpen, toggleOverlayMenu } = useOverlayMenu()

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
                  onClick={toggleOverlayMenu}
                />
              ))}
            </Menu>
          </nav>
        </div>
        <OverlayMenuToggle
          isOpen={isOverlayMenuOpen}
          className={styles.toggle}
          onClick={toggleOverlayMenu}
        />
      </>
    ) : null
  )
}