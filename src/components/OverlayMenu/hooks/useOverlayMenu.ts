import { useState, useCallback, useEffect, SyntheticEvent } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { usePageNavigation } from '@/helpers/hooks/usePageNavigation'
import { useDebounce } from '@/helpers/hooks/useDebounce'
import { scrollTrackerOffsets } from '@/helpers/constants/scrollTrackerOffsets'

export const useOverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)
  const { handleNavLinkClick } = usePageNavigation()

  const toggleOverlayMenu = useCallback(() => setIsOverlayMenuOpen(prevState => !prevState), [])

  const onNavLinkClick = (event: SyntheticEvent, index: number) => {
    handleNavLinkClick(event, index, scrollTrackerOffsets.mobile, toggleOverlayMenu)
  }

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY
    const viewportHeight = window.innerHeight
    const middleOfViewport = currentScrollPosition + viewportHeight / 2

    const sections = Array.from(document.querySelectorAll('section'))
    const footer = document.querySelector('footer')

    const elements = footer ? [...sections, footer] : sections

    elements.forEach(element => {
      const top = element.offsetTop
      const bottom = top + element.offsetHeight

      if (middleOfViewport >= top && middleOfViewport < bottom) {
        const intersectingElementIndex = parseInt(element.getAttribute('data-toc-idx') || '-1')

        setActiveSectionIndex(intersectingElementIndex)
        return
      }
    })
  }, [])

  const debouncedHandleScroll = useDebounce(handleScroll)

  useEffect(() => setIsVisible(isMobile), [isMobile])

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', debouncedHandleScroll)
  
      return () => window.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [debouncedHandleScroll, isMobile])

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
