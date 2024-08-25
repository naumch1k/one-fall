import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <section className={styles.root}>
        <div className={styles.mainWrapper}>
          <span className={styles.badge}>404 error</span>
          <h1 className={styles.header}>
            We couldn’t find the page you’re looking for
          </h1>
          <div className={styles.infoWrapper}>
            <p className={styles.description}>
              Some things just don’t go the way you want. Like the page you’re
              looking for is gone. Or the link is broken. Check the URL and try
              reloading the page. Or go back to home page to find other good
              stuff.
            </p>
            <ArrowLink href='/' target='_self' text='Go to Homepage' />
          </div>
        </div>
      </section>

      <div className={styles.decorWrapper}>
        <div className={styles.decorLine1}>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
        </div>
        <div className={styles.decorLine2}>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
          <span>404</span>
        </div>
      </div>
    </>
  )
}
