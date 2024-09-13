import { useRef, useCallback, useState, useEffect, SyntheticEvent } from 'react'
import { usePageNavigation } from '@/helpers/hooks'

export const useMainNavigation = () => {
  const prevScrollPosition = useRef(0)
  const [isCovert, setIsCovert] = useState(false)
  const { activeSectionIndex, handleNavLinkClick } = usePageNavigation()

  // Show/hide nav menu based on scroll direction
  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY
    const isScrollingUp = prevScrollPosition.current > currentScrollPosition

    if (isScrollingUp) setIsCovert(false)
    else setIsCovert(true)

    prevScrollPosition.current = currentScrollPosition
  }, [])

  const onNavLinkClick = (event: SyntheticEvent, index: number) => {
    handleNavLinkClick(event, index)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isCovert, activeSectionIndex, onNavLinkClick }
}
