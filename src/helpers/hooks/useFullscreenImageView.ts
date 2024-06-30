import { useCallback, useState } from 'react'
import { useModal } from '@/components/ui/Modal/hooks/useModal'

type FullscreenViewItem = {
  id: string
  imageUrl: string
}

export const useFullscreenImageView = <T extends FullscreenViewItem>(data: { items: T[] }) => {
  /* prettier-ignore */
  const [currentItem, setCurrentItem] = useState<T | undefined>(undefined)
  /* prettier-ignore */
  const {
    isModalOpen, 
    openModal,
    closeModal,
    closeByBackdropClick,
  } = useModal()

  const handleImageClick = useCallback(
    (id: string) => {
      const item = data.items.find(item => item.id === id)

      if (item) {
        setCurrentItem(item)
        openModal()
      }
    },
    [data.items, openModal]
  )

  return {
    currentItem,
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    handleImageClick,
  }
}
