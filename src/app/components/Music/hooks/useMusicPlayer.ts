import { useEffect, useState } from 'react'
import { TAudioRef } from '@/helpers/types'

export const useMusicPlayer = (audioTrackRefs: Record<string, TAudioRef>) => {
  const [prevTrackName, setPrevTrackName] = useState('')
  const [currentTrackName, setCurrentTrackName] = useState<string>('')
  const [currentTrackTimeProgress, setCurrentTrackTimeProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    const updateProgress = () => {
      const currentTrackElement = audioTrackRefs[currentTrackName].current

      if (currentTrackElement) setCurrentTrackTimeProgress(currentTrackElement.currentTime)
    }

    if (isPlaying) {
      const intervalId = setInterval(updateProgress, 500)
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, currentTrackName, audioTrackRefs])

  const handlePlayPauseClick = (newTrackName: string) => {
    const newTrackElement = audioTrackRefs[newTrackName].current

    if (newTrackElement) {
      if (isPlaying) {
        if (currentTrackName !== newTrackName) {
          Object.values(audioTrackRefs).forEach(ref => {
            if (ref.current) ref.current.pause()
          })

          setCurrentTrackName(newTrackName)
          setCurrentTrackTimeProgress(0)
          newTrackElement.currentTime = 0
          newTrackElement.play()
        } else {
          setPrevTrackName(currentTrackName)
          setCurrentTrackName('')
          setIsPlaying(false)
          newTrackElement.pause()
        }
      } else {
        if (prevTrackName !== newTrackName) {
          setCurrentTrackName(newTrackName)
          setIsPlaying(true)
          setCurrentTrackTimeProgress(0)
          newTrackElement.currentTime = 0
          newTrackElement.play()
        } else {
          setCurrentTrackName(newTrackName)
          setIsPlaying(true)
          newTrackElement.play()
        }
      }
    }
  }

  return {
    currentTrackName,
    currentTrackTimeProgress,
    handlePlayPauseClick,
  }
}
