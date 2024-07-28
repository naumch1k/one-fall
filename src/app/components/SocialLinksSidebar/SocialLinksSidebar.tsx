'use client'

import { Menu } from '@/components/ui/Menu/Menu'
import { socialLinkItems } from '@/helpers/constants'

export const SocialLinksSidebar = () => {
  return (
    <Menu type='sidebar-social-links'>
      {socialLinkItems.map(item => (
        <Menu.Item
          key={item.text}
          {...item}
          rel='noopener noreferrer'
          target='_blank'
        />
      ))}
    </Menu>
  )
}
