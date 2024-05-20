import { useEffect, useState } from 'react'
import useThrottle from './useThrottle'

export const useWindowSize = () => {
  const getWindowSize = (): { width: number; height: number } => {
    if (typeof window === 'undefined') return { width: 0, height: 0 }
    
    const { innerWidth: width, innerHeight: height } = window
    return { width, height }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())

  const handleWindowResize = () => setWindowSize(getWindowSize())
  const throttledHandleWindowResize = useThrottle(handleWindowResize, 1000)

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('resize', throttledHandleWindowResize)

    return () => window.removeEventListener('resize', throttledHandleWindowResize)
  }, [throttledHandleWindowResize])

  return windowSize
}