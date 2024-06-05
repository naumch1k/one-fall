'use client'

import Image from 'next/image'
import styles from './Hero.module.css'

export const Hero = () => {
  return (
    <section id='hero' className={styles.root}>
      <h1 className='visuallyHidden'>One Fall</h1>
      <Image
        className={styles.logo}
        src='/images/logo.png'
        alt='One Fall Logo'
        width={300}
        height={170}
      />
    </section>
  )
}