import { useRef, useCallback, useState, useEffect } from 'react'

export const useMainNavigation = () => {
  const prevScrollPosition = useRef(0)
  const [isCovert, setIsCovert] = useState(false)
  const [currentLink, setCurrentLink] = useState('hero')

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY

    if (
      prevScrollPosition.current > currentScrollPosition ||
      currentScrollPosition < window.innerHeight - 150
    ) {
      setIsCovert(false)
    } else {
      setIsCovert(true)
    }

    prevScrollPosition.current = currentScrollPosition

    const sections = Array.from(document.querySelectorAll('section'))
    const footer = document.querySelector('footer')

    const elements = footer ? [...sections, footer] : sections

    elements.forEach(element => {
      const top = element.offsetTop - 150
      const bottom = top + element.offsetHeight

      if (currentScrollPosition >= top && currentScrollPosition < bottom) {
        const id = element.getAttribute('id')
        setCurrentLink(id || '')
        return
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isCovert, currentLink }
}
