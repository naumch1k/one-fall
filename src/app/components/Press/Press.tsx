'use client'

import { Slider } from '@/components/ui/Slider/Slider'
import { PressCard } from '../PressCard/PressCard'
import { useSortedPressCards } from './hook/useSortedPressCards'
import styles from './Press.module.css'

import data from './data.json'

export const Press = () => {
  const sortedPressCards = useSortedPressCards(data.items)

  return (
    <section id='press' className={styles.root}>
      <h2 className='visuallyHidden'>Press</h2>
      <Slider
        border='topBottom'
        items={sortedPressCards}
        SlideComponent={PressCard}
      />
    </section>
  )
}
