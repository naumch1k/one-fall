'use client'

import Image from 'next/image'
import Logo from '../../../../public/images/logo2.png'
import styles from './Hero.module.css'

export const Hero = () => {
  return (
    <section id='hero' className={styles.root}>
      <h1 className='visuallyHidden'>One Fall</h1>
      <Image className={styles.logo} src={Logo} alt='One Fall Logo' width={300}/>
    </section>
  )
}