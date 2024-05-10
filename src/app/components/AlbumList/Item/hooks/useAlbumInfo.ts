import { useEffect, useState } from 'react'
import { ITrack, TAudioRef } from '@/helpers/types'

export const useAlbumInfo = (tracks: ITrack[], audioTrackRefs: Record<string, TAudioRef>) => {
  const [duration, setDuration] = useState<number>(0)
  const [trackCount, setTrackCount] = useState<number>(0)

  useEffect(() => {
    const calculateAlbumDurations = () => {
        let duration = 0
        let trackCount = 0

        tracks.forEach(track => {
          const audioTrackRef = audioTrackRefs[track.name]

          if (audioTrackRef?.current && !isNaN(audioTrackRef.current.duration)) {
            duration += audioTrackRef.current.duration
          }
          trackCount += 1
        })

      setDuration(duration)
      setTrackCount(trackCount)
    }

    calculateAlbumDurations()
  }, [tracks, audioTrackRefs])
  
  return { duration, trackCount }
}