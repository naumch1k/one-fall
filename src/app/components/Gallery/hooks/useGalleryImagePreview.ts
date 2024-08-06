import { useState, useEffect, useRef } from 'react'
import { TImage } from '@/helpers/types'

export const useGalleryImagePreview = () => {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [previewedItem, setPreviewedItem] = useState<TImage | null>(null)
  const prevPreviewedItem = useRef<TImage | null>(null)

  const handleMouseEnter = (item: TImage) => {
    prevPreviewedItem.current = previewedItem
    setPreviewedItem(item)
  }

  const handleMouseLeave = () => {
    setPreviewedItem(null)
    setIsPreviewing(false)
  }

  useEffect(() => {
    if (previewedItem !== prevPreviewedItem.current) {
      setIsPreviewing(false)
      setTimeout(() => {
        setIsPreviewing(true)
      }, 100)
    }
  }, [previewedItem])

  return {
    previewedItem,
    handleMouseEnter,
    handleMouseLeave,
    isPreviewing,
  }
}