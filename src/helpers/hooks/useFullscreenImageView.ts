import { useCallback, useState } from 'react'
import { useModal } from '@/components/ui/Modal/hooks/useModal'
import { TImage } from '../types'

export const useFullscreenImageView = <T extends TImage>(items: T[]) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number | undefined>(undefined)
  const {
    isModalOpen, 
    openModal,
    closeModal,
    closeByBackdropClick,
  } = useModal()

  const handleImageClick = useCallback(
    (id: string) => {
      const item = items.find(item => item.id === id)
      const index = items.findIndex(item => item.id === id)

      if (item) {
        setCurrentItemIndex(index !== -1 ? index : 0)
        openModal()
      }
    },
    [items, openModal]
  )

  return {
    currentItemIndex,
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    handleImageClick,
  }
}
