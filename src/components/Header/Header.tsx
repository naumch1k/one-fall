import { MainNavigation } from '../MainNavigation/MainNavigation'
import styles from './Header.module.css'

export const Header = () => (
  <header className={styles.root}>
    <MainNavigation />
  </header>
)
