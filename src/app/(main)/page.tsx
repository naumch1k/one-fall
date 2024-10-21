import type { Metadata } from 'next'

import { Hero } from '@/app/components/Hero/Hero'
import { Skeletons } from '../components/Skeletons/Skeletons'
import { About } from '@/app/components/About/About'
import { Music } from '@/app/components/Music/Music'
import { Events } from '@/app/components/Events/Events'
import { Merch } from '@/app/components/Merch/Merch'
import { Gallery } from '@/app/components/Gallery/Gallery'
import { Press } from '@/app/components/Press/Press'

export const metadata: Metadata = {
  title: 'One Fall',
  description:
    'One Fall - melodic punk and hardcore quartet from Salem, Massachusetts',
}

export default function Main() {
  return (
    <>
      <Hero />
      <Skeletons />
      <About />
      <Music />
      <Events />
      <Merch />
      <Gallery />
      <Press />
    </>
  )
}
