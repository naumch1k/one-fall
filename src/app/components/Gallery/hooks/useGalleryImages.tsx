import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { TImage } from '@/helpers/types'

export const useGalleryImages = (
  data: { items: TImage[] },
  maxItemCount = 9,
  defaultItemCount = 8,
) => {
  const shouldFillThreeRows = useMediaQuery(`(min-width: 920px) and (max-width: 1209px)`)

  return shouldFillThreeRows
    ? data.items.slice(0, maxItemCount)
    : data.items.slice(0, defaultItemCount)
}
