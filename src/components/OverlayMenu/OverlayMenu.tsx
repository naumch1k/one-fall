'use client'

import { Menu } from '../ui/Menu/Menu'
import { OverlayToggle } from '../ui/OverlayToggle/OverlayToggle'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useOverlayMenu } from './hooks/useOverlayMenu'
import { mainNavigationItems, socialLinkItems } from '@/helpers/constants'
import styles from './OverlayMenu.module.css'
import { SocialLinksSidebar } from '@/app/components/SocialLinksSidebar/SocialLinksSidebar'

export const OverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const { isOverlayMenuOpen, toggleOverlayMenu } = useOverlayMenu()

  if (!isMobile) return null

  return (
    <>
      {/* prettier-ignore */}
      <div className={`${styles.root} ${isOverlayMenuOpen ? `${styles.isOpen}` : ''}`}>
        <nav className={styles.nav}>
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
       <Menu type='overlay-social-links'>
      {socialLinkItems.map(({fullListOnly, ...item}) => (
        <Menu.Item
          key={item.text}
          {...item}
          rel='noopener noreferrer'
          target='_blank'
        />
      ))}
    </Menu>
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
