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
    let scrollY: number = 0

    if (isOverlayMenuOpen) {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
      } else {
        document.body.style.overflowY = 'hidden'
      }
    }

    return () => {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.position = ''
        document.body.style.top = ``
        document.body.style.width = ''
        window.scrollTo(0, scrollY)
      } else {
        document.body.style.overflowY = 'scroll'
      }
    }
  }, [isOverlayMenuOpen])

  return {
    isOverlayMenuOpen,
    toggleOverlayMenu,
  }
}
