import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useScrollLock } from '@/helpers/hooks/useScrollLock'

export const useOverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 767px)`)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)

  const toggleOverlayMenu = useCallback(() => {
    setIsOverlayMenuOpen(!isOverlayMenuOpen)
  }, [isOverlayMenuOpen])

  useEffect(() => {
    if (!isMobile) setIsOverlayMenuOpen(false)
  }, [isMobile])

  useScrollLock(isOverlayMenuOpen)

  return {
    isOverlayMenuOpen,
    toggleOverlayMenu,
  }
}
