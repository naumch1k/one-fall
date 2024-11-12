'use client'

import { CursorReveal } from './CursorReveal/CursorReveal'
import { useMediaQuery } from '@/helpers/hooks'
import { Breakpoints } from '@/helpers/constants'

export const Skeletons = () => {
  const isDesktop = useMediaQuery(`(min-width: ${Breakpoints.DESKTOP}px)`)

  return isDesktop ? <CursorReveal /> : null
}
