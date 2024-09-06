'use client'

import Link from 'next/link'
import { useMainNavigation } from './hooks/useMainNavigation'
import { mainNavigationItems } from '@/helpers/constants'
import styles from './MainNavigation.module.css'

export const MainNavigation = () => {
  const { isCovert, activeSectionIndex, onNavLinkClick } = useMainNavigation()

  return (
    <nav className={`${styles.root} ${isCovert ? styles.isCovert : ''}`}>
      <ul className={styles.navList}>
        {mainNavigationItems.map(({ index, text, href }) => {
          return (
            <li key={index}>
              <Link
                className={`${styles.navLink} ${activeSectionIndex === index ? styles.active : ''}`}
                href={href}
                tabIndex={activeSectionIndex === index ? -1 : 0}
                onClick={event => onNavLinkClick(event, index)}
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
