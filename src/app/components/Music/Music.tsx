'use client'

import { List } from '@/components/ui/List/List'
import { Carousel } from '@/components/ui/Carousel/Carousel'
import { AlbumItem } from '../AlbumItem/AlbumItem'
import { AudioTrack } from '@/components/ui/AudioTrack/AudioTrack'
import { useInitAudioTrackRefs } from './hooks/useInitAudioTrackRefs'
import { useMusicPlayer } from './hooks/useMusicPlayer'
import { AudioTrackRefsProvider } from '@/helpers/contexts/AudioTrackRefs.context'
import { ALBUM_CAROUSEL_THRESHOLD } from '@/helpers/constants'
import { IAlbum } from '@/helpers/types'
import styles from './Music.module.css'

import data from './data.json'

export const Music = () => {
  const { items } = data
  const audioTrackRefs = useInitAudioTrackRefs(items)
  const {
    currentTrackName,
    currentTrackTimeProgress,
    handlePlayPauseClick,
  } = useMusicPlayer(audioTrackRefs)

  // TODO: Try to move somewhere else
  const renderAlbumItem = (album: IAlbum, tabIndex: number = 0) => {
    return (
      <AlbumItem
        name={album.name}
        type={album.type}
        year={album.date.year}
        bandCampUrl={album.purchaseInfo.purchaseUrl}
        spotifyUrl={album.sharingInfo.shareUrl}
        tracks={album.tracks.items}
        coverArt={album.coverArtUrl}
        tabIndex={tabIndex}
      >
        <List type='track-list'>
          {album.tracks.items.map(track => (
            <List.Item key={track.name}>
              <AudioTrack
                {...track}
                timeProgress={currentTrackTimeProgress}
                isPlaying={currentTrackName === track.name}
                onPlayPauseClick={handlePlayPauseClick}
                tabIndex={tabIndex}
              />
            </List.Item>
          ))}
        </List>
      </AlbumItem>
    )
  }

  return (
    <section id='music' className={styles.root}>
      <h2 className='visuallyHidden'>Music</h2>
      <AudioTrackRefsProvider value={audioTrackRefs}>
        {items.length > ALBUM_CAROUSEL_THRESHOLD ? (
          <Carousel
            mode='single'
            items={items}
            SlideComponent={renderAlbumItem}
          />
        ) : (
          <List type='music-list'>
            {items.map(album => (
              <List.Item key={album.name}>{renderAlbumItem(album)}</List.Item>
            ))}
          </List>
        )}
      </AudioTrackRefsProvider>
    </section>
  )
}
