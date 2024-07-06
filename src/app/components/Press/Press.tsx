import { PressList } from '../PressList/PressList'
import { PressCard } from '../PressCard/PressCard'
import { useSortedPressCards } from './hook/useSortedPressCards'
import styles from './Press.module.css'

import data from './data.json'

export const Press = () => {
  const sortedPressCards = useSortedPressCards(data.items)

  return (
    <section id='press' className={styles.root}>
      <h2 className='visuallyHidden'>Press</h2>

      <PressList>
        {sortedPressCards.slice(0, 3).map(card => (
          <PressList.Item key={card.id}>
            <PressCard {...card} />
          </PressList.Item>
        ))}
      </PressList>
    </section>
  )
}
