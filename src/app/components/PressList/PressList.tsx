import { PressListItem } from './Item/PressListItem'
import styles from './PressList.module.css'

const Component = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.root}>{children}</ul>
}

export const PressList = Object.assign(Component, {
  Item: PressListItem,
})
