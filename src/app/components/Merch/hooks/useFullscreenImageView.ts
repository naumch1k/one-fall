import { useCallback, useState } from 'react'
import { useModal } from '@/components/ui/Modal/hooks/useModal'
import { IMerchItem } from '@/helpers/types'

export const useFullscreenImageView = (data: { items: IMerchItem[] }) => {
  /* prettier-ignore */
  const [currentItem, setCurrentItem] = useState<IMerchItem | undefined>(undefined)
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
