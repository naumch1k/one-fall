import { EventListItem } from './Item/EventListItem'
import styles from './EventList.module.css'

const Component = ({ children }: { children: React.ReactNode }) => (
  <ul className={styles.root}>{children}</ul>
)

export const EventList = Object.assign(Component, {
  Item: EventListItem,
})
