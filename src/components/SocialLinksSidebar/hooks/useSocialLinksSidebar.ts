import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/helpers/hooks'

export const useSocialLinksSidebar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const isDesktop = useMediaQuery(`(min-width: 1024px)`)

  useEffect(() => {
    setIsVisible(isDesktop)
  }, [isDesktop])

  return isVisible
}
