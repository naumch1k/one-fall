import { useState } from 'react'
import { TAudioRef } from '@/helpers/types'

export const useMusicPlayer = (audioTrackRefs: Record<string, TAudioRef>) => {
  const [trackPlaying, setTrackPlaying] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlayPauseClick = (trackName: string) => {
    const selectedTrackRef = audioTrackRefs[trackName]

    if (selectedTrackRef.current) {
      if (isPlaying) {
        if (trackPlaying !== trackName) {
          Object.values(audioTrackRefs).forEach(ref => {
            if (ref.current) ref.current.pause()
          })
          setTrackPlaying(trackName)
          selectedTrackRef.current.play()
        } else {
          setTrackPlaying('')
          setIsPlaying(false)
          selectedTrackRef.current.pause()
        }
      } else {
        setTrackPlaying(trackName)
        setIsPlaying(true)
        selectedTrackRef.current.play()
      }
    }
  }

  return { trackPlaying, handlePlayPauseClick }
}
