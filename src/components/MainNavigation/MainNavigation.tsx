'use client'

import Link from 'next/link'
import { useMainNavigation } from './hooks/useMainNavigation'
import { mainNavigationItems } from '@/helpers/constants'
import styles from './MainNavigation.module.css'

export const MainNavigation = () => {
  const { isCovert, activeIndex, handleNavLinkClick } = useMainNavigation()

  return (
    <nav className={`${styles.root} ${isCovert ? styles.isCovert : ''}`}>
      <ul className={styles.navList}>
        {mainNavigationItems.map(({ index, text, href }) => {
          return (
            <li key={index}>
              <Link
                className={`${styles.navLink} ${activeIndex === index ? styles.active : ''}`}
                href={href}
                tabIndex={activeIndex === index ? -1 : 0}
                onClick={event => handleNavLinkClick(event, index)}
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
