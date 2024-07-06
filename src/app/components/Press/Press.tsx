import { PressList } from '../PressList/PressList'
import { useSortedPressCards } from './hook/useSortedPressCards'
import { PressCard } from '../PressCard/PressCard'
import data from './data.json'
import styles from './Press.module.css'

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
