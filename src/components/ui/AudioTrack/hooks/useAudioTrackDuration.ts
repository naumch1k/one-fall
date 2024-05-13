import { useState, useEffect, useCallback } from 'react'
import { TAudioRef } from '@/helpers/types'

export const useAudioTrackDuration = (audioRef: TAudioRef) =>  {
  const [duration, setDuration] = useState(0)
  const [timeProgress, setTimeProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef?.current) setTimeProgress(audioRef.current.currentTime)
    }

    const intervalId = setInterval(updateProgress, 1000)

    return () => clearInterval(intervalId)
  }, [audioRef])

  const setTrackDuration = useCallback(() => {
    if (audioRef?.current) setDuration(audioRef.current.duration)
  }, [audioRef])

  useEffect(() => {
    setTrackDuration()
  }, [setTrackDuration])

  return { duration, timeProgress }
}