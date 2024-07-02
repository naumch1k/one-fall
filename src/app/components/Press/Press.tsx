import { PressCardList } from '../PressCardList/PressCardList'
import { PressCardItem } from '../PressCardList/Item/PressCardItem'
import { useSortedPressCards } from './hook/useSortedPressCards'
import styles from './Press.module.css'
import data from './data.json'

export const Press = () => {
  const sortedPressCards = useSortedPressCards(data.items)

  return (
    <section id='press' className={styles.root}>
      <h2 className='visuallyHidden'>Press</h2>

      <PressCardList>
        {sortedPressCards.slice(0, 3).map(card => (
          <PressCardItem key={card.id} {...card} />
        ))}
      </PressCardList>
    </section>
  )
}
