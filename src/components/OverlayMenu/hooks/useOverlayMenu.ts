import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useScrollLock } from '@/helpers/hooks/useScrollLock'

export const useOverlayMenu = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)
  const isMobile = useMediaQuery(`(max-width: 1023px)`)

  const toggleOverlayMenu = useCallback(() => {
    setIsOverlayMenuOpen(prevState => !prevState)
  }, [])

  useEffect(() => {
    setIsVisible(isMobile)
  }, [isMobile])

  useScrollLock(isOverlayMenuOpen)

  return {
    isVisible,
    isOverlayMenuOpen,
    toggleOverlayMenu,
  }
}
