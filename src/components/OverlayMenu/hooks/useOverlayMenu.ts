import { useState, useCallback, useEffect, SyntheticEvent } from 'react'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'

export const useOverlayMenu = () => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  const [isVisible, setIsVisible] = useState(false)
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const toggleOverlayMenu = useCallback(() => {
    setIsOverlayMenuOpen(prevState => !prevState)
  }, [])

  const onNavLinkClick = (event: SyntheticEvent, index: number) => {
    event?.preventDefault()

    const element = document.querySelector(`[data-toc-idx="${index}"]`)
    if (element) {
      const boundingClientRect = element.getBoundingClientRect()
      const elementY = boundingClientRect.top + window.scrollY + 1

      window.scrollTo({ top: elementY, behavior: 'smooth' })
    }

    toggleOverlayMenu()
  }

  const handleObserverIntersection = (entries: IntersectionObserverEntry[]) => {
    let localActiveIndex: number | null = activeIndex

    // Track which elements register above or below the document's current position
    const aboveIndeces: number[] = []
    const belowIndeces: number[] = []

    // Loop through each intersecting element
    entries.forEach(({ isIntersecting, boundingClientRect, rootBounds, target }: IntersectionObserverEntry) => {
      if (!isIntersecting) setActiveIndex(-1)

      // Detect if intersecting element is above the browser viewport; include cross browser logic
      const boundingClientRectY = typeof boundingClientRect.y !== 'undefined'
          ? boundingClientRect.y
          : boundingClientRect.top

          const rootBoundsY = rootBounds
          ? typeof rootBounds.y !== 'undefined'
            ? rootBounds.y
            : rootBounds.top
          : window.innerHeight


      const isAbove = boundingClientRectY < rootBoundsY

      // Get index of intersecting element from DOM attribute
      const intersectingElementIndex = parseInt(target.getAttribute('data-toc-idx') || '-1')

      // Record index as either above or below current index
      if (isAbove) aboveIndeces.push(intersectingElementIndex)
      else belowIndeces.push(intersectingElementIndex)
    })

    // Determine min and max fired indeces values (support for multiple elements firing at once)
    const minIndex = belowIndeces.length > 0 ? Math.min(...belowIndeces) : -1
    const maxIndex = aboveIndeces.length > 0 ? Math.max(...aboveIndeces) : -1

    // Determine how to adjust localActiveIndex based on scroll direction
    if (aboveIndeces.length > 0) {
      // Scrolling down - set to max of fired indeces
      localActiveIndex = maxIndex
    } else {
      // Scrolling up - set to minimum of fired indeces
      localActiveIndex = minIndex - 1 >= 0 ? minIndex - 1 : -1
    }

    if (localActiveIndex !== activeIndex) setActiveIndex(localActiveIndex)
  }

  useEffect(() => {
    const sectionHeadings = document.querySelectorAll('.scrollTracker')

    const observer = new IntersectionObserver(handleObserverIntersection
  )

    sectionHeadings.forEach(heading => observer.observe(heading))
  }, [])


  useEffect(() => {
    setIsVisible(isMobile)
  }, [isMobile])

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
    activeIndex,
    onNavLinkClick,
    toggleOverlayMenu,
  }
}
