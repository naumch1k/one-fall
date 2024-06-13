import { TrackListItem } from './Item/TrackListItem'
import styles from './TrackList.module.css'

const Component = ({ children }: { children: React.ReactNode }) => (
  <ul className={styles.root}>{children}</ul>
)

export const TrackList = Object.assign(Component, {
  Item: TrackListItem,
})
