'use client'

import { Menu } from '@/components/ui/Menu/Menu'
import { socialLinkItems } from '@/helpers/constants'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'

export const SocialLinksSidebar = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)

  return !isMobile ? (
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
  ) : null
}
