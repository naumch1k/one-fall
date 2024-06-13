'use client'

import { Menu } from '../ui/Menu/Menu'
import { OverlayToggle } from '../ui/OverlayToggle/OverlayToggle'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useOverlayMenu } from './hooks/useOverlayMenu'
import { mainNavigationItems } from '@/helpers/constants/mainNavigationItems'
import styles from './OverlayMenu.module.css'

export const OverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const { isOverlayMenuOpen, toggleOverlayMenu } = useOverlayMenu()

  if (!isMobile) return null

  return (
    <>
      {/* prettier-ignore */}
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
      <OverlayToggle
        ariaLabel={isOverlayMenuOpen ? 'Close menu' : 'Open menu'}
        className={styles.toggle}
        onClick={toggleOverlayMenu}
      >
        {isOverlayMenuOpen ? 'Close' : 'Menu'}
      </OverlayToggle>
    </>
  )
}
