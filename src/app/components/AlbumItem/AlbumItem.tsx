import Image from 'next/image'
import { Button } from '@/components/ui/Button/Button'
import { SpotifyLink } from '@/components/ui/SpotifyLink/SpotifyLink'
import { FormattedDuration } from '@/components/ui/FormattedDuration/FormattedDuration'
import { useAudioTrackRefs } from '@/helpers/contexts/AudioTrackRefs.context'
import { useAlbumInfo } from './hooks/useAlbumInfo'
import { ITrack } from '@/helpers/types'
import styles from './AlbumItem.module.css'

interface IAlbumListItemProps {
  name: string
  type: string
  year: number
  bandCampUrl: string
  spotifyUrl: string
  tracks: ITrack[]
  coverArt: string
  tabIndex: number
  children: React.ReactNode
}

export const AlbumItem = ({
  name,
  type,
  year,
  bandCampUrl,
  spotifyUrl,
  tracks,
  coverArt,
  tabIndex,
  children,
}: IAlbumListItemProps) => {
  const audioTrackRefs = useAudioTrackRefs()
  const { duration, trackCount } = useAlbumInfo(tracks, audioTrackRefs)

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={coverArt}
          alt={`${name} Cover Art`}
          fill
          sizes='(max-width: 480px) 100vw, (max-width: 1024px) 232px, 360px'
        />
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.name}>{name}</h3>
        <dl className={styles.details}>
          <dt className='visuallyHidden'>Type</dt>
          <dd>{type}</dd>
          <dt className='visuallyHidden'>Year</dt>
          <dd>{year}</dd>
          <dt className='visuallyHidden'>Tracks Count</dt>
          <dd>{trackCount} songs</dd>
          <dt className='visuallyHidden'>Total Duration</dt>
          <dd>
            <FormattedDuration
              durationInSeconds={duration}
              outputFormat='with-units'
            />
          </dd>
        </dl>
        <div className={styles.buttons}>
          <Button
            isLink
            href={bandCampUrl}
            rel='noopener noreferrer'
            target='_blank'
            tabIndex={tabIndex}
          >
            Buy Digital Album
          </Button>
          <SpotifyLink href={spotifyUrl} />
        </div>
      </div>
      {children}
    </div>
  )
}
