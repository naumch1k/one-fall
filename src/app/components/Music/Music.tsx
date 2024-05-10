'use client'

import { AlbumList } from '../AlbumList/AlbumList'
import { TrackList } from '../TrackList/TrackList'
import { AudioTrack } from '@/components/ui/AudioTrack/AudioTrack'
import { useAudioTrackRefs } from './hooks/useAudioTrackRefs'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { AudioTrackRefsProvider } from '@/helpers/contexts/AudioTrackRefs.context'
import styles from './Music.module.css'

import data from './data.json'

export const Music = () => {
  const audioTrackRefs = useAudioTrackRefs(data)
  const {
    trackPlaying,
    handlePlayPauseClick,
  } = useMusicPlayer(audioTrackRefs)

  return (
    <section id='music' className={styles.root}>
      <h2 className='visuallyHidden'>Music</h2>
      <AlbumList>
        <AudioTrackRefsProvider value={audioTrackRefs}>
          {data.items.map(album => (
            <AlbumList.Item
              key={album.name}
              name={album.name}
              type={album.type}
              year={album.date.year}
              bandCampUrl={album.purchaseInfo.purchaseUrl}
              tracks={album.tracks.items}
              coverArt={album.coverArt.sources[0].url}
            >
              <TrackList>
                {album.tracks.items.map(track => (
                  <TrackList.Item key={track.name}>
                    <AudioTrack
                      number={track.number}
                      name={track.name}
                      dataFileUrl={track.dataFileUrl}
                      isPlaying={trackPlaying === track.name}
                      onPlayPauseClick={handlePlayPauseClick}
                    />
                  </TrackList.Item>
                ))}
              </TrackList>
            </AlbumList.Item>
          ))}
        </AudioTrackRefsProvider>
      </AlbumList>
    </section>
  )
}