import { ArrowLink } from '@/components/ui/ArrowLink/ArrowLink'

import styles from './About.module.css'

export const About = () => (
  <section data-toc-idx='1' className={styles.root}>
    <h2 className='visuallyHidden'>About</h2>
    <p className={styles.text}>
      Formed just over a year ago, this Salem-based melodic punk and hardcore
      quartet has rapidly made a mark in New England. Known for their early hit
      songs, powerful riffs, and dynamic live.
    </p>
    <ArrowLink
      href='https://docs.google.com/document/d/1ewbz8SDwqfCvDqanZPgs-DbR6oCl0i7TNjxYrznLeA4'
      text='Read more'
    />
  </section>
)
