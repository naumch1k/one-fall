'use client'

import { List } from '@/components/ui/List/List'
import { PressCard } from '../PressCard/PressCard'
import { useSortedPressCards } from './hook/useSortedPressCards'
import styles from './Press.module.css'

import data from './data.json'

export const Press = () => {
  const sortedPressCards = useSortedPressCards(data.items)

  return (
    <section id='press' className={styles.root}>
      <h2 className='visuallyHidden'>Press</h2>

      <List type='press-list'>
        {sortedPressCards.slice(0, 3).map(card => (
          <List.Item key={card.id}>
            <PressCard {...card} />
          </List.Item>
        ))}
      </List>
    </section>
  )
}
