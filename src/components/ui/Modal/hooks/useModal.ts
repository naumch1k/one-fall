import { useCallback, useEffect, useState } from 'react'

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
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth

    document.documentElement.style.setProperty(
      '--scrollbar-compensation',
      `${scrollBarCompensation}px`
    )
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-compensation)'
      document.body.dataset.scrollLock = 'true'
    }

    return () => {
      document.body.style.overflowY = 'scroll'
      document.body.style.paddingRight = `0px`
      delete document.body.dataset.scrollLock
    }
  }, [isModalOpen])

  useEffect(() => {
    if (isModalOpen) document.addEventListener('keydown', closeByEsc)

    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeByEsc, isModalOpen])

  return {
    isModalOpen,
    openModal,
    closeModal,
    closeByBackdropClick,
  }
}
