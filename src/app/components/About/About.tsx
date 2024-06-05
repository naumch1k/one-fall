import Image from 'next/image'
import styles from './About.module.css'

export const About = () => {
  return (
    <section id='about' className={styles.root}>
      <div className={styles.imageWrapper}>
        <Image 
          className={styles.image}
          src='/images/band-image.png'
          alt='Band members standing against yellow brick wall'
          fill
          sizes='100wv'
        />
      </div>
      <div className={styles.story}>
        <p className={styles.storyText}>
          Formed just over a year ago, this Salem-based melodic punk and hardcore quartet has rapidly made a mark in New England.
          Known for their early hit songs, powerful riffs, and dynamic live.
        </p>
      </div>
    </section>
  )
}