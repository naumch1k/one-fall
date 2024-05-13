import { 
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react'

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

    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      const top = section.offsetTop - 150
      const bottom = top + section.offsetHeight

      if (currentScrollPosition >= top && currentScrollPosition < bottom) {
        const id = section.getAttribute('id')
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