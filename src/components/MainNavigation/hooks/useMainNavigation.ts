import { useRef, useCallback, useState, useEffect, SyntheticEvent } from 'react'
import { usePageNavigation } from '@/helpers/hooks/usePageNavigation'
import { scrollTrackerOffsets } from '@/helpers/constants/scrollTrackerOffsets'

export const useMainNavigation = () => {
  const prevScrollPosition = useRef(0)
  const [isCovert, setIsCovert] = useState(false)
  const { activeSectionIndex, handleNavLinkClick } = usePageNavigation()

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY
    const isScrollingUp = prevScrollPosition.current > currentScrollPosition

    if (isScrollingUp) setIsCovert(false)
    else setIsCovert(true)

    prevScrollPosition.current = currentScrollPosition
  }, [])

  const onNavLinkClick = (event: SyntheticEvent, index: number) => {
    handleNavLinkClick(event, index, scrollTrackerOffsets.desktop)
  }

  useEffect(() => {
    // TODO: throttle
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isCovert, activeSectionIndex, onNavLinkClick }
}
