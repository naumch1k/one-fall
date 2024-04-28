import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    if (mediaQueryList.matches !== matches) setMatches(mediaQueryList.matches)

      const onChange = (mediaQueryList: MediaQueryListEvent) => setMatches(mediaQueryList.matches)

      typeof mediaQueryList.addEventListener === 'function'
        ? mediaQueryList.addEventListener('change', onChange)
        : mediaQueryList.addListener(onChange)

      return () => {
        typeof mediaQueryList.addEventListener === 'function'
          ? mediaQueryList.removeEventListener('change', onChange)
          : mediaQueryList.removeListener(onChange)
      }
  }, [query])

  return matches
}