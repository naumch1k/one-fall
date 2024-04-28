import { Montserrat } from 'next/font/google'
import styles from './Footer.module.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
})

export const Footer = () => {
  return (
    <footer className={`${styles.root} ${montserrat.className}`}>footer</footer>
  )
}
