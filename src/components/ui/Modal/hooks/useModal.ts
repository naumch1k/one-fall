import { useCallback, useEffect, useState } from 'react'
import { useScrollLock } from '@/helpers/hooks'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const closeByBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal()
    },
    [closeModal]
  )

  const closeByEsc = useCallback(
    (e: Event) => {
      if (e instanceof KeyboardEvent && e.code === 'Escape') {
        e.preventDefault()
        closeModal()
      }
    },
    [closeModal]
  )

  useEffect(() => {
    if (isModalOpen) document.addEventListener('keydown', closeByEsc)

    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeByEsc, isModalOpen])

  useScrollLock(isModalOpen)

  return {
    isModalOpen,
    openModal,
    closeModal,
    closeByBackdropClick,
  }
}
