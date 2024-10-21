import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'

export const useSkeletonsMask = (maskSize: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })

  const maskX = useMotionValue(-maskSize / 2)
  const maskY = useMotionValue(-maskSize / 2)

  // Function to generate the SVG mask based on maskSize
  const getMaskImage = (maskSize: number) => {
    const radius = maskSize / 2
    const svg =
      `<svg viewBox="0 0 ${maskSize} ${maskSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${radius}" cy="${radius}" r="${radius}" fill="black" />
      </svg>`
  
    const encodedSvg = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
    return `url("data:image/svg+xml,${encodedSvg}")` 
  }

  useEffect(() => {
    const updateMaskPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = mousePositionRef.current.x
        const mouseY = mousePositionRef.current.y

        maskX.set(mouseX - rect.left - maskSize / 2)
        maskY.set(mouseY - rect.top - maskSize / 2)
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY }
      updateMaskPosition()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', updateMaskPosition, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', updateMaskPosition)
    }
  }, [containerRef, maskSize, maskX, maskY])

  const maskPosition = useTransform(
    [maskX, maskY],
    (values) => `${values[0]}px ${values[1]}px`
  )

  return { containerRef, maskPosition, getMaskImage }
}
