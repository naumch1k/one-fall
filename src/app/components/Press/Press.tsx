import { PressCardList } from '@/components/ui/PressCardList/PressCardList'
import { PressCardItem } from '@/components/ui/PressCardList/Item/PressCardItem'

import styles from './Press.module.css'
import data from './data.json'

export const Press = () => {
  const sortedCardsByDESC = [...data.items].toSorted(
    (firstCard, secondCard) => {
      const firstDate = new Date(firstCard.publishDate).getTime()
      const secondDate = new Date(secondCard.publishDate).getTime()

      return secondDate - firstDate
    }
  )

  return (
    <section id='press' className={styles.root}>
      <h2 className='visuallyHidden'>Press</h2>

      <PressCardList>
        {sortedCardsByDESC.map(card => (
          <PressCardItem
            key={card.id}
            id={card.id}
            title={card.title}
            outline={card.outline}
            publisher={card.publisher}
            publishDate={card.publishDate}
            publishUrl={card.publishUrl}
            imageUrl={card.imageUrl}
          />
        ))}
      </PressCardList>
    </section>
  )
}
