import type { Metadata } from 'next'
import { Hero } from '@/app/components/Hero/Hero'
import { About } from '@/app/components/About/About'
import { Music } from '@/app/components/Music/Music'

export const metadata: Metadata = {
  title: 'One Fall',
  description: 'One Fall - melodic punk and hardcore quartet from Salem, Massachusetts',
}

export default function Main() {
  return (
    <main>
      <Hero/>
      <About/>
      <Music/>
    </main>
  )
}
