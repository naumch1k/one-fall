'use client'

import { ContactForm } from '@/app/components/ContactForm/ContactForm'
import { Menu } from '../ui/Menu/Menu'
import {
  mainNavigationItems,
  musicStreamingItems,
  socialLinkItems,
} from '@/helpers/constants'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.content}>
        <span className='scrollTracker' data-toc-idx='6'></span>
        <div className={styles.form}>
          <h3 className={styles.heading}>Message Us</h3>
          <ContactForm />
        </div>
        <div className={styles.nav}>
          <h3 className={styles.heading}>Website</h3>
          <Menu type='footer-navigation'>
            {mainNavigationItems.map(item => (
              <Menu.Item key={item.id} {...item} />
            ))}
          </Menu>
        </div>
        <div className={styles.listen}>
          <h3 className={styles.heading}>Listen</h3>
          <Menu type='footer-navigation'>
            {musicStreamingItems.map(item => (
              <Menu.Item
                key={item.text}
                {...item}
                rel='noopener noreferrer'
                target='_blank'
              />
            ))}
          </Menu>
        </div>
        <div className={styles.socials}>
          <h3 className={styles.heading}>Socials</h3>
          <Menu type='footer-social-links'>
            {socialLinkItems
              .filter(({ fullListOnly }) => !fullListOnly)
              .map(({ fullListOnly, ...item }) => (
                <Menu.Item
                  key={item.text}
                  {...item}
                  rel='noopener noreferrer'
                  target='_blank'
                />
              ))}
          </Menu>
        </div>
        <p className={styles.footnote}>@2024, ONE FALL. All Rights Reserved</p>
      </div>
    </footer>
  )
}
