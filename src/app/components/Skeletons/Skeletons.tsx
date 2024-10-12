'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/helpers/hooks'
import { useSkeletonsMask } from './hooks/useSkeletonsMask'
import styles from './Skeletons.module.css'

const MotionImage = motion(Image)
const maskSize = 175

export const Skeletons = () => {
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)
  const { containerRef, maskPosition, getMaskImage } = useSkeletonsMask(maskSize)
  const maskImage = getMaskImage(maskSize)

  const CursorReveal = (
    <div className={styles.skeletons} ref={containerRef}>
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
        alt=''
        fill
        sizes='100vw'
        style={{
          WebkitMaskPosition: maskPosition,
          maskPosition: maskPosition,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: `${maskSize}px ${maskSize}px`,
          maskSize: `${maskSize}px ${maskSize}px`,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      />
    </div>
  )

  return <>{isDesktop ? CursorReveal : <p>tablet</p>}</>
}
