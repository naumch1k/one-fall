'use client'

import Link from 'next/link'
import { useMainNavigation } from './hooks/useMainNavigation'
import { mainNavigationItems } from '@/helpers/constants'
import styles from './MainNavigation.module.css'

export const MainNavigation = () => {
  const { isCovert, currentLink } = useMainNavigation()

  return (
    <nav className={styles.root}>
      <ul className={styles.navList}>
        {mainNavigationItems.map(({ index, id, text, href }) => {
          return (
            <li key={index}>
              <Link
                className={`
                ${styles.navLink} 
                ${isCovert ? styles.covert : ''}
                ${currentLink === id ? styles.current : ''}`}
                href={href}
                tabIndex={currentLink === id ? -1 : 0}
              >
                {text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
