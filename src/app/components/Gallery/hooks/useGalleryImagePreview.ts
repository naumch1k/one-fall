import { useState, useEffect, useRef } from 'react'
import { IGalleryImage } from '@/helpers/types'

export const useGalleryImagePreview = () => {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [previewedItem, setPreviewedItem] = useState<IGalleryImage | null>(null)
  const prevPreviewedItem = useRef<IGalleryImage | null>(null)
  const previewImageRef = useRef<HTMLImageElement | null>(null)

  const handleMouseEnter = (item: IGalleryImage) => {
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
    previewImageRef,
    handleMouseEnter,
    handleMouseLeave,
    isPreviewing,
  }
}