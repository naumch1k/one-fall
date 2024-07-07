import { useEffect, useState } from 'react'
import { ITrack, TAudioRef } from '@/helpers/types'

export const useAlbumInfo = (
  tracks: ITrack[],
  audioTrackRefs: Record<string, TAudioRef>
) => {
  const [duration, setDuration] = useState<number>(0)
  const [trackCount, setTrackCount] = useState<number>(0)

  useEffect(() => {
    let totalDuration = 0
    let totalTrackCount = 0

    const promises = tracks.map(track => {
      return new Promise<void>(resolve => {
        const audioTrackRef = audioTrackRefs[track.name]

        if (audioTrackRef?.current) {
          const audioElement = audioTrackRef.current

          const handleLoadedMetadata = () => {
            if (!isNaN(audioElement.duration)) {
              totalDuration += audioElement.duration
              totalTrackCount += 1
            }
            audioElement.removeEventListener(
              'loadedmetadata',
              handleLoadedMetadata
            )
            resolve()
          }

          if (audioElement.readyState >= 1) {
            handleLoadedMetadata()
          } else {
            audioElement.addEventListener(
              'loadedmetadata',
              handleLoadedMetadata
            )
          }
        } else {
          resolve()
        }
      })
    })

    Promise.all(promises).then(() => {
      setDuration(totalDuration)
      setTrackCount(totalTrackCount)
    })
  }, [tracks, audioTrackRefs])

  return { duration, trackCount }
}
