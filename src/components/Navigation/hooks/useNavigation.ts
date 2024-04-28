import { useEffect, useState } from 'react'

export const useMainNavigation = () => {
  const [activeLink, setActiveLink] = useState('hero')

  useEffect(() => {
    // const sectionIds = document.querySelectorAll('section')
    // console.log(sectionIds)


    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const top = section.offsetTop - 150
        const bottom = top + section.offsetHeight
        const scrollPosition = window.scrollY

        if (scrollPosition >= top && scrollPosition < bottom) {
          const id = section.getAttribute('id')
          setActiveLink(id || '')
          return
        }

        // console.log({ section, topOffset })
        // console.log({ section, sectionOffsetHeight })
        // console.log({ scrollPosition })
      })
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll)
    // Remove event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  console.log({activeLink})
  return activeLink
}