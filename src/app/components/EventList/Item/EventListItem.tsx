import styles from './EventListItem.module.css'

export const EventListItem = ({ children }: { children: React.ReactNode }) => (
  <li className={styles.root}>{children}</li>
)
