import { useState, useCallback, useEffect, SyntheticEvent } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { usePageNavigation } from '@/helpers/hooks/usePageNavigation'

export const useOverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const [isVisible, setIsVisible] = useState(false)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)
  const { activeSectionIndex, handleNavLinkClick } = usePageNavigation()

  const toggleOverlayMenu = useCallback(() => setIsOverlayMenuOpen(prevState => !prevState), [])

  const onNavLinkClick = (event: SyntheticEvent, index: number) => {
    handleNavLinkClick(event, index, toggleOverlayMenu)
  }

  useEffect(() => setIsVisible(isMobile), [isMobile])

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) =>  e.preventDefault()

    if (isOverlayMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
    } else {
      document.body.style.overflow = 'scroll'
      document.removeEventListener('touchmove', handleTouchMove)
    }

    return () => document.removeEventListener('touchmove', handleTouchMove)
  }, [isOverlayMenuOpen])

  return {
    isVisible,
    isOverlayMenuOpen,
    activeSectionIndex,
    onNavLinkClick,
    toggleOverlayMenu,
  }
}
