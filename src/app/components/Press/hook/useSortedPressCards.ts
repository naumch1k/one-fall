import { IPressCard } from '@/helpers/types/pressItem'

export const useSortedPressCards = (cards: IPressCard[]) => {
  const sortedCards = cards.sort((firstCard, secondCard) => {
    const firstDate = new Date(firstCard.publishDate).getTime()
    const secondDate = new Date(secondCard.publishDate).getTime()

    return secondDate - firstDate
  })

  return sortedCards
}
