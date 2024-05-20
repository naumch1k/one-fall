import { FaPlay, FaPause } from 'react-icons/fa'
import { Equalizer } from '../Equalizer/Equalizer'
import { FormattedDuration } from '../FormattedDuration/FormattedDuration'
import { useAudioTrackRefs } from '@/helpers/contexts/AudioTrackRefs.context'
import { useAudioTrackDuration } from './hooks/useAudioTrackDuration'
import styles from './AudioTrack.module.css'

interface IAudioTrackProps {
  number: number
  name: string
  dataFileUrl: string
  isPlaying: boolean
  onPlayPauseClick: (name: string) => void
}

export const AudioTrack = ({
  number,
  name,
  dataFileUrl,
  isPlaying,
  onPlayPauseClick,
}: IAudioTrackProps) => {
  const audioTrackRefs = useAudioTrackRefs()
  const { duration, timeProgress } = useAudioTrackDuration(audioTrackRefs[name])
  
  return (
    <>
      <div className={`${styles.root} ${isPlaying ? styles.isPlaying : ''}`}>
        <div className={styles.innerWrapper}>
          <span className={styles.number}>
            {isPlaying ? <Equalizer className={styles.equalizer}/> : `${number}.`}
          </span>
          <button className={styles.playToggle} onClick={() => onPlayPauseClick(name)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <span className={styles.name}>{name}</span>
        <FormattedDuration
          durationInSeconds={isPlaying ? timeProgress : duration}
          outputFormat='colon-separated'
          className={styles.duration}
        />
      </div>
      <audio ref={audioTrackRefs[name]} src={dataFileUrl} preload='metadata'/>
    </>
  )
}