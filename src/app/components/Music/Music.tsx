'use client'

import { List } from '@/components/ui/List/List'
import { AlbumItem } from '../AlbumItem/AlbumItem'
import { AudioTrack } from '@/components/ui/AudioTrack/AudioTrack'
import { useInitAudioTrackRefs } from './hooks/useInitAudioTrackRefs'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { AudioTrackRefsProvider } from '@/helpers/contexts/AudioTrackRefs.context'
import styles from './Music.module.css'

import data from './data.json'

export const Music = () => {
  const audioTrackRefs = useInitAudioTrackRefs(data)
  const { trackPlaying, handlePlayPauseClick } = useMusicPlayer(audioTrackRefs)

  return (
    <section id='music' className={styles.root}>
      <h2 className='visuallyHidden'>Music</h2>
      <List type='music-list'>
        <AudioTrackRefsProvider value={audioTrackRefs}>
          {data.items.map(album => (
            <List.Item key={album.name}>
              <AlbumItem
                name={album.name}
                type={album.type}
                year={album.date.year}
                bandCampUrl={album.purchaseInfo.purchaseUrl}
                tracks={album.tracks.items}
                coverArt={album.coverArt.sources[0].url}
              >
                <List type='track-list'>
                  {album.tracks.items.map(track => (
                    <List.Item key={track.name}>
                      <AudioTrack
                        number={track.number}
                        name={track.name}
                        dataFileUrl={track.dataFileUrl}
                        isPlaying={trackPlaying === track.name}
                        onPlayPauseClick={handlePlayPauseClick}
                      />
                    </List.Item>
                  ))}
                </List>
              </AlbumItem>
            </List.Item>
          ))}
        </AudioTrackRefsProvider>
      </List>
    </section>
  )
}
