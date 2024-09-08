import { useRef, useCallback } from 'react'

export const useDebounce = (callback: () => void, delay: number = 300) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)


    timerRef.current = setTimeout(() => {
      callback()
      timerRef.current = null
    }, delay)
  }, [callback, delay])
}
