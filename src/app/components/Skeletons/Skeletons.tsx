'use client'

import { useMediaQuery } from '@/helpers/hooks'
import { SkeletonsCursorReveal } from './CursorReveal/SkeletonsCursorReveal'

export const Skeletons = () => {
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)

  return isDesktop ? <SkeletonsCursorReveal /> : null
}
