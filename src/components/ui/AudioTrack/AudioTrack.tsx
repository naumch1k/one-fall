import { Equalizer } from '../Equalizer/Equalizer'
import { Icon } from '../Icon/Icon'
import { FormattedDuration } from '../FormattedDuration/FormattedDuration'
import { useAudioTrackRefs } from '@/helpers/contexts/AudioTrackRefs.context'
import { useAudioTrackDuration } from './hooks/useAudioTrackDuration'
import styles from './AudioTrack.module.css'

interface IAudioTrackProps {
  number: number
  name: string
  dataFileUrl: string
  timeProgress: number
  isPlaying: boolean
  isPaused: boolean
  onPlayPauseClick: (name: string) => void
  tabIndex: number
}

export const AudioTrack = ({
  number,
  name,
  timeProgress = 0,
  dataFileUrl,
  isPlaying,
  isPaused,
  onPlayPauseClick,
  tabIndex,
}: IAudioTrackProps) => {
  const audioTrackRefs = useAudioTrackRefs()
  const duration = useAudioTrackDuration(audioTrackRefs[name])

  const classes = `${styles.root} ${isPlaying ? styles.isPlaying : ''} ${isPaused ? styles.isPaused : ''}`

  return (
    <>
      <div className={classes}>
        <div className={styles.innerWrapper}>
          <span className={styles.number}>
            {isPlaying ? (
              <Equalizer className={styles.equalizer} />
            ) : (
              `${number}.`
            )}
          </span>
          <button
            className={styles.playToggle}
            onClick={() => onPlayPauseClick(name)}
            aria-label={isPlaying ? `Pause ${name} preview` : `Play ${name} preview`}
            tabIndex={tabIndex}
          >
            <Icon
              className={styles.playIcon}
              glyph={isPlaying ? 'pause' : 'play'}
            />
          </button>
        </div>
        <span className={styles.name}>{name}</span>
        <FormattedDuration
          durationInSeconds={isPlaying || isPaused ? timeProgress : duration}
          outputFormat='colon-separated'
          className={styles.duration}
        />
      </div>
      <audio ref={audioTrackRefs[name]} src={dataFileUrl} preload='metadata' />
    </>
  )
}
