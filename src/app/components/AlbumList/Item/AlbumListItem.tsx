import Image from 'next/image'
import { Button } from '@/components/ui/Button/Button'
import { FormattedDuration } from '@/components/ui/FormattedDuration/FormattedDuration'
import { ITrack } from '@/helpers/types'
import styles from './AlbumListItem.module.css'
import { useAudioTrackRefs } from '@/helpers/contexts/AudioTrackRefs.context'
import { useAlbumInfo } from './hooks/useAlbumInfo'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'

interface IAlbumListItemProps {
  name: string
  type: string
  year: number
  bandCampUrl: string
  tracks: ITrack[]
  coverArt: string
  children: React.ReactNode
}

export const AlbumListItem = ({
  name,
  type,
  year,
  bandCampUrl,
  tracks,
  coverArt,
  children,
}: IAlbumListItemProps) => {
  const isMobile = useMediaQuery(`(max-width: 767px)`)
  const audioTrackRefs = useAudioTrackRefs()
  const { duration, trackCount } = useAlbumInfo(tracks, audioTrackRefs)

  return (
    <li className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={coverArt}
          alt={`${name} Cover Art`}
          fill
        />
      </div>
      <div className={styles.detailsWrapper}>
        <h3 className={styles.name}>{name}</h3>
        <dl className={styles.details}>
          {!isMobile && (
            <>
              <dt className='visuallyHidden'>Type</dt>
              <dd>{type}</dd>
            </>
          )}
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
      </div>
      <div className={styles.buttons}>
        <Button
          isLink
          href={bandCampUrl}
          rel='noopener noreferrer'
          target='_blank'
        >
          Buy Digital Album
        </Button>
      </div>
      {children}
    </li>
  )
}
