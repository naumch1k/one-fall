import { useCallback, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSkeletonsMask } from './hooks/useSkeletonsMask'
import { SkeletonPaths } from '@/helpers/constants'

import styles from './SkeletonsCursorReveal.module.css'

const MotionImage = motion(Image)

export const SkeletonsCursorReveal = () => {
  const [isHovered, setIsHovered] = useState(false)
  const {
    containerRef,
    maskImage,
    maskSize,
    maskPosition,
    handleMouseMove,
  } = useSkeletonsMask(isHovered)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  // useEffect(() => {
  //   const elements = document.querySelectorAll('[data-skeleton-id]')
  //   console.log('Elements found:', elements)
  //   elements.forEach(element => {
  //     console.log('Data skeleton ID:', element.getAttribute('data-skeleton-id'))
  //   })
  // }, [isDesktop])

  return (
    <div className={styles.root} ref={containerRef} onMouseMove={handleMouseMove}>
      <Image
        className={styles.bandImage}
        src='/images/band-image.png'
        alt='Band members standing against yellow brick wall'
        fill
        sizes='100vw'
      />
      <MotionImage
        className={styles.skeletonArt}
        src='/images/skeleton-art-accessories.jpg'
        alt='A fun graphic of a rock band with members depicted as their skeleton selves'
        fill
        sizes='100vw'
        style={{
          WebkitMaskPosition: maskPosition,
          maskPosition: maskPosition,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskSize: `${maskSize}px ${maskSize}px`,
          maskSize: `${maskSize}px ${maskSize}px`,
        }}
      />
      <svg
        className={styles.skeletonPaths}
        viewBox='0 0 1440 816'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'
      >
        {SkeletonPaths.map(path => (
          <path
            key={path.id}
            data-skeleton-id={path.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            d={path.d}
            fillOpacity='0'
          />
        ))}
      </svg>
    </div>
  )
}
