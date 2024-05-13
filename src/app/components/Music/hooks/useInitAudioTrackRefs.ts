import { createRef, useEffect, useState } from 'react';
import { IAlbum, ITrack, TAudioRef } from '@/helpers/types';

export const useInitAudioTrackRefs = (data: { items: IAlbum[] }) => {
  const [tracks, setTracks] = useState<ITrack[]>([])
  const audioTrackRefs: Record<string, TAudioRef> = {}

  useEffect(() => {
    const getAllTracks = (data: { items: IAlbum[] }) => {
      let allTracks: ITrack[] = []

      data.items.forEach(album => {
        album.tracks.items.forEach((track: ITrack) => allTracks.push(track))
      })

      setTracks(allTracks)
    }

    getAllTracks(data)
  }, [data])

  tracks.forEach(track => audioTrackRefs[track.name] = createRef<HTMLAudioElement>())

  return audioTrackRefs
}