import styles from './PressListItem.module.css'

export const PressListItem = ({ children }: { children: React.ReactNode }) => (
  <li className={styles.root}>{children}</li>
)
