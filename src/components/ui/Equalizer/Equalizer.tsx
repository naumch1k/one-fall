import styles from './Equalizer.module.css'

interface IEqualizerProps {
  className?: string
}

export const Equalizer = ({ className = '' }: IEqualizerProps) => (
  <div className={`${styles.root} ${className}`}>
    <div className={styles.item}></div>
  </div>
)
