import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'
import { Ribbon } from '@/components/ui/Ribbon/Ribbon'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <section className={styles.root}>
        <div className={styles.container}>
          <h1 className={styles.title}>404 error</h1>
          <h2 className={styles.subTitle}>
            We couldn’t find the page you’re looking for
          </h2>
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

        <Ribbon />
      </section>
    </>
  )
}
