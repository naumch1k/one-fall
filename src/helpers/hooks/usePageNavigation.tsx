import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'
import { useMediaQuery } from './useMediaQuery'
import { useDebounce } from './useDebounce'
import { Breakpoints, ScrollTrackerOffsets } from '@/helpers/constants'

export const usePageNavigation = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const { width, height } = useWindowSize()
  const [scrollTrackerOffset, setScrollTrackerOffset] = useState<number>(ScrollTrackerOffsets.MOBILE)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(-1)

  useEffect(() => {
    switch (true) {
      case width >= Breakpoints.LARGE_DESKTOP:
        setScrollTrackerOffset(ScrollTrackerOffsets.LARGE_DESKTOP)
        break
      case width >= Breakpoints.DESKTOP:
        setScrollTrackerOffset(ScrollTrackerOffsets.DESKTOP)
        break
      default:
        setScrollTrackerOffset(ScrollTrackerOffsets.MOBILE)
        break
    }
  }, [width])

  const handleNavLinkClick = (
    event: SyntheticEvent,
    index: number,
    callback?: () => void,
  ) => {
    event?.preventDefault()

    const element = document.querySelector(`[data-toc-idx="${index}"]`)

    if (element) {
      const boundingClientRect = element.getBoundingClientRect()
      const elementY = boundingClientRect.top + window.scrollY

      window.scrollTo({ top: elementY, behavior: 'smooth' })
    }

    if (callback) callback()
  }

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY

    // Calculate the comparison point
    const comparePoint = isMobile
      ? currentScrollPosition + height / 2
      : currentScrollPosition

    const elements = Array.from(document.querySelectorAll<HTMLElement>('section, footer'))

    for (const element of elements) {
      const top = element.offsetTop - scrollTrackerOffset
      const bottom = top + element.offsetHeight

      if (comparePoint >= top && comparePoint < bottom) {
        const intersectingElementIndex = parseInt(element.getAttribute('data-toc-idx') || '-1')

        setActiveSectionIndex(intersectingElementIndex)
        break
      }
    }
  }, [scrollTrackerOffset, height, isMobile])

  // Debounced handleScroll for mobile devices
  const debouncedHandleScroll = useDebounce(handleScroll)

  // Set up the scroll event listener
  useEffect(() => {
    const scrollHandler = isMobile ? debouncedHandleScroll : handleScroll

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [handleScroll, debouncedHandleScroll, width, isMobile])

  return { activeSectionIndex, handleNavLinkClick }
}
