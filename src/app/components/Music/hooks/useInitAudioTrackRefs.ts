import { createRef, useMemo } from 'react'
import { IAlbum, ITrack, TAudioRef } from '@/helpers/types'

export const useInitAudioTrackRefs = (items: IAlbum[]) => {
  const audioTrackRefs = useMemo(() => {
    const refs: Record<string, TAudioRef> = {}

    const allTracks: ITrack[] = []
    items.forEach(album => {
      album.tracks.items.forEach((track: ITrack) => allTracks.push(track))
    })

    allTracks.forEach(track => {
      if (!refs[track.name]) {
        refs[track.name] = createRef<HTMLAudioElement>()
      }
    })

    return refs
  }, [items])

  return audioTrackRefs
}
