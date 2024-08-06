import { createRef, useEffect, useState } from 'react'
import { IAlbum, ITrack, TAudioRef } from '@/helpers/types'

export const useInitAudioTrackRefs = (items: IAlbum[]) => {
  const [tracks, setTracks] = useState<ITrack[]>([])
  const audioTrackRefs: Record<string, TAudioRef> = {}

  useEffect(() => {
    const getAllTracks = (items: IAlbum[]) => {
      let allTracks: ITrack[] = []

      items.forEach(album => {
        album.tracks.items.forEach((track: ITrack) => allTracks.push(track))
      })

      setTracks(allTracks)
    }

    getAllTracks(items)
  }, [items])

  tracks.forEach(
    track => (audioTrackRefs[track.name] = createRef<HTMLAudioElement>())
  )

  return audioTrackRefs
}
