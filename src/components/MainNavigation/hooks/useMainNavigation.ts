import { useRef, useCallback, useState, useEffect, SyntheticEvent } from 'react'

export const useMainNavigation = () => {
  const prevScrollPosition = useRef(0)
  const [isCovert, setIsCovert] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY
    const isScrollingUp = prevScrollPosition.current > currentScrollPosition

    if (isScrollingUp) setIsCovert(false)
    else setIsCovert(true)

    prevScrollPosition.current = currentScrollPosition
  }, [])

  const handleNavLinkClick = (event: SyntheticEvent, index: number) => {
    event?.preventDefault()

    const element = document.querySelector(`[data-toc-idx="${index}"]`)
    if (element) {
      const boundingClientRect = element.getBoundingClientRect()
      const elementY = boundingClientRect.top + window.scrollY + 151

      window.scrollTo({ top: elementY, behavior: 'smooth' })
    }
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
    const scrollTrackers = document.querySelectorAll('.scrollTracker')

    const observer = new IntersectionObserver(handleObserverIntersection)

    scrollTrackers.forEach(scrollTracker => observer.observe(scrollTracker))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isCovert, activeIndex, handleNavLinkClick }
}
