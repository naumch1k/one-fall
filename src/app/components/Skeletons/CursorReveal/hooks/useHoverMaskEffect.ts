import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMotionTemplate, useMotionValue } from 'framer-motion'
import { useMediaQuery } from '@/helpers/hooks'
import { Breakpoints } from '@/helpers/constants'
import { SkeletonsMaskSizes } from '@/helpers/constants/skeletonsMaskSizes'
import { IMember } from '@/helpers/types'

const calculateMaskSize = (hoveredMember: IMember | null, isLargeDesktop: boolean): number => {
  const { DEFAULT, HOVER_DESKTOP, HOVER_LARGE_DESKTOP } = SkeletonsMaskSizes

  if (!hoveredMember) return DEFAULT

  return isLargeDesktop ? HOVER_LARGE_DESKTOP : HOVER_DESKTOP
}

const generateMaskImage = (maskSize: number): string => {
  const radius = maskSize / 2
  const svg = `<svg viewBox="0 0 ${maskSize} ${maskSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="black" />
    </svg>`

  const encodedSvg = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')

  return `url("data:image/svg+xml,${encodedSvg}")`
}

export const useHoverMaskEffect = (hoveredMember: IMember | null) => {
  const isLargeDesktop = useMediaQuery(`(min-width: ${Breakpoints.LARGE_DESKTOP}px)`)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const maskPositionX = useMotionValue(0)
  const maskPositionY = useMotionValue(0)

  // Determine maskSize
  const maskSize = calculateMaskSize(hoveredMember, isLargeDesktop)

  // Generate the SVG mask based on maskSize
  const maskImage = useMemo(() => generateMaskImage(maskSize), [maskSize])

  // Combine maskX and maskY into a single CSS value
  const maskPosition = useMotionTemplate`${maskPositionX}px ${maskPositionY}px`

  // Handle mouse movement over the container
  const updateMaskPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = mousePositionRef.current.x - rect.left - maskSize / 2
      const y = mousePositionRef.current.y - rect.top - maskSize / 2

      maskPositionX.set(x)
      maskPositionY.set(y)
    }
  }, [maskSize, maskPositionX, maskPositionY])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      mousePositionRef.current.x = event.clientX
      mousePositionRef.current.y = event.clientY
      updateMaskPosition()
    },
    [updateMaskPosition]
  )

  // Update mask position when scrolling
  useEffect(() => {
    window.addEventListener('scroll', updateMaskPosition, { passive: true })

    return () => window.removeEventListener('scroll', updateMaskPosition)
  }, [updateMaskPosition])

  // Update mask position when maskSize changes
  useEffect(() =>  updateMaskPosition(), [maskSize, updateMaskPosition])

  const maskStyles = useMemo(() => ({
    WebkitMaskPosition: maskPosition,
    maskPosition,
    WebkitMaskImage: maskImage,
    maskImage,
    WebkitMaskSize: `${maskSize}px ${maskSize}px`,
    maskSize: `${maskSize}px ${maskSize}px`,
  }), [maskPosition, maskImage, maskSize])

  return { containerRef, maskStyles, handleMouseMove }
}
