'use client'

import { Menu } from '@/components/ui/Menu/Menu'
import { socialLinkItems } from '@/helpers/constants'

interface SocialLinksSidebarProp {
  type: 'main' | 'mobile'
}

export const SocialLinksSidebar = ({ type }: SocialLinksSidebarProp) => {
  return (
    <Menu type={`${type}-social-links`}>
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
