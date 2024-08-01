'use client'

import { Menu } from '@/components/ui/Menu/Menu'
import { socialLinkItems } from '@/helpers/constants'
import { useSocialLinksSidebar } from './hooks/useSocialLinksSidebar'
import styles from './SocialLinksSidebar.module.css'

export const SocialLinksSidebar = () => {
  const isVisible = useSocialLinksSidebar()

  if (!isVisible) return null

  return (
    <aside className={styles.root}>
      <Menu type='sidebar-social-links'>
        {socialLinkItems.map(({ fullListOnly, ...item }) => (
          <Menu.Item
            key={item.text}
            {...item}
            rel='noopener noreferrer'
            target='_blank'
          />
        ))}
      </Menu>
    </aside>
  )
}
