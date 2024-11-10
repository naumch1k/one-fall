import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMotionTemplate, useMotionValue } from 'framer-motion'
import { useMediaQuery } from '@/helpers/hooks'
import { SkeletonsMaskSizes } from '@/helpers/constants/skeletonsMaskSizes'

const { DEFAULT, HOVER_DESKTOP, HOVER_LARGE_DESKTOP } = SkeletonsMaskSizes

const getMaskSize = (isHovered: boolean, isLargeDesktop: boolean): number => {
  if (!isHovered) return DEFAULT

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

export const useSkeletonsMask = (isHovered: boolean) => {
  const isLargeDesktop = useMediaQuery(`(min-width: 2560px)`)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const maskX = useMotionValue(0)
  const maskY = useMotionValue(0)

  // Determine maskSize
  const maskSize = getMaskSize(isHovered, isLargeDesktop)

  // Generate the SVG mask based on maskSize
  const maskImage = useMemo(() => generateMaskImage(maskSize), [maskSize])

  // Combine maskX and maskY into a single CSS value
  const maskPosition = useMotionTemplate`${maskX}px ${maskY}px`

  // Handle mouse movement over the container
  const updateMaskPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = mousePositionRef.current.x - rect.left - maskSize / 2
      const y = mousePositionRef.current.y - rect.top - maskSize / 2

      maskX.set(x)
      maskY.set(y)
    }
  }, [maskSize, maskX, maskY])

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

  return { containerRef, maskImage, maskSize, maskPosition, handleMouseMove }
}
