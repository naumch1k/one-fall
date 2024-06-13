import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'

export const useOverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 767px)`)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)

  const toggleOverlayMenu = useCallback(() => {
    setIsOverlayMenuOpen(!isOverlayMenuOpen)
  }, [isOverlayMenuOpen])

  useEffect(() => {
    if (!isMobile) setIsOverlayMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (isOverlayMenuOpen) document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'scroll'
    }
  }, [isOverlayMenuOpen])

  return {
    isOverlayMenuOpen,
    toggleOverlayMenu,
  }
}
