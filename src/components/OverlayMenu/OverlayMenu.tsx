'use client'

import { Menu } from '../ui/Menu/Menu'
import { Icon } from '../ui/Icon/Icon'
import { OverlayToggle } from '../ui/OverlayToggle/OverlayToggle'
import { useOverlayMenu } from './hooks/useOverlayMenu'
import { mainNavigationItems, socialLinkItems } from '@/helpers/constants'
import styles from './OverlayMenu.module.css'

export const OverlayMenu = () => {
  const { isVisible, isOverlayMenuOpen, toggleOverlayMenu } = useOverlayMenu()

  if (!isVisible) return null

  return (
    <>
      <div className={`${styles.root} ${isOverlayMenuOpen ? `${styles.isOpen}` : ''}`}>
        <div className={styles.content}>
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
          <Menu type='overlay-social-links'>
            {socialLinkItems.map(({ fullListOnly, ...item }) => (
              <Menu.Item
                key={item.text}
                {...item}
                rel='noopener noreferrer'
                target='_blank'
              />
            ))}
          </Menu>
        </div>
        {isOverlayMenuOpen && (
        <button
          className={styles.closeButton}
          type='button'
          aria-label='Close Modal'
          onClick={toggleOverlayMenu}
        >
          <Icon glyph='x' width='100%' height='100%' />
        </button>
      )}
      </div>
      {!isOverlayMenuOpen && (
        // TODO: restyle OverlayToggle
        <OverlayToggle
          ariaLabel='Open menu'
          className={styles.toggle}
          onClick={toggleOverlayMenu}
        >
          Menu
        </OverlayToggle>
      )}
    </>
  )
}
