import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Hero } from '@/app/components/Hero/Hero'
import { About } from '@/app/components/About/About'
import { Music } from '@/app/components/Music/Music'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'One Fall',
  description: 'One Fall - melodic punk and hardcore quartet from Salem, Massachusetts',
}

export default function Main() {
  return (
    <main className={montserrat.className}>
      <Hero/>
      <About/>
      <Music/>
    </main>
  )
}
