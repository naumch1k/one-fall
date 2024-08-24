import { Icon } from '../Icon/Icon'
import styles from './SpotifyLink.module.css'

interface ISpotifyLinkProps {
  href: string
  className?: string
}

export const SpotifyLink = ({
  href,
  className = '',
  ...props
}: ISpotifyLinkProps) => (
  <a
    className={`${styles.root} ${className}`}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  >
    <Icon glyph='spotify-logo' width={18} height={18} />
    <span className={styles.text}>Listen on Spotify</span>
  </a>
)
