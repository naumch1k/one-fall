import { AlbumListItem } from './Item/AlbumListItem'
import styles from './AlbumList.module.css'

const Component = ({ children }: { children: React.ReactNode }) => (
  <ul className={styles.root}>{children}</ul>
)

export const AlbumList = Object.assign(Component, {
  Item: AlbumListItem,
})
