import { ArrowLink } from '../ui/ArrowLink/ArrowLink'
import { RibbonSvg } from '../ui/RibbonSvg/RibbonSvg'
import styles from './NotFoundError.module.css'

export const NotFoundError = () => (
  <section className={styles.root}>
    <div className={styles.container}>
      <h1 className={styles.title}>404 error</h1>
      <h2 className={styles.subtitle}>We couldn’t find the page you’re&nbsp;looking for</h2>
      <div className={styles.innerWrapper}>
        <p className={styles.text}>
          Some things just don&rsquo;t go&nbsp;the way you want. Like the page
          you&rsquo;re looking for is&nbsp;gone. Or&nbsp;the link
          is&nbsp;broken. Check the URL and try reloading the page.
          Or&nbsp;go&nbsp;back to&nbsp;home page to&nbsp;find other good stuff.
        </p>
        <ArrowLink href='/' target='_self' text='Go to Homepage' />
      </div>
    </div>
    <RibbonSvg className={styles.ribbon} />
    <RibbonSvg className={styles.ribbon} />
  </section>
)
