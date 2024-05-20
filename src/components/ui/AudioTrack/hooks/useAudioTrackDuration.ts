import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (audioRef?.current) {
      const audioElement = audioRef.current

      const updateDuration = () => setDuration(audioElement.duration)

      updateDuration()
      
      audioElement.addEventListener('loadedmetadata', updateDuration)

      return () => {
        audioElement.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [audioRef])

  return { duration, timeProgress }
}