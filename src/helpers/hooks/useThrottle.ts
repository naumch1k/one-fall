import { useRef } from 'react'

function useThrottle(callback: () => void, limit: number = 100) {
  const lastRun = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  return function() {
    const currentRun = Date.now()

    if (currentRun - lastRun.current >= limit) {
      callback()
      lastRun.current = currentRun
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        callback()
        lastRun.current = currentRun
        timerRef.current = null
      }, limit - (currentRun - lastRun.current))
    }
  }
}

export default useThrottle