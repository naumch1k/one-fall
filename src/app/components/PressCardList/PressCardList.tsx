import styles from './PressCardList.module.css'

export const PressCardList = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.root}>{children}</ul>
}
