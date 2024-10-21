'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/helpers/hooks'
import { useSkeletonsMask } from './hooks/useSkeletonsMask'
import styles from './Skeletons.module.css'

const MotionImage = motion(Image)

export const Skeletons = () => {
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)
  const isLargeDesktop = useMediaQuery(`(min-width: 2560px)`)
  const [isHovered, setIsHovered] = useState(false)
  const maskSize = isHovered ? (isLargeDesktop ? 280 : 200) : 30
  const { containerRef, maskPosition, getMaskImage } =
    useSkeletonsMask(maskSize)
  const maskImage = getMaskImage(maskSize)

  useEffect(() => {
    const elements = document.querySelectorAll('[data-skeleton-id]')
    console.log('Elements found:', elements)
    elements.forEach(element => {
      console.log('Data skeleton ID:', element.getAttribute('data-skeleton-id'))
    })
  }, [isDesktop])

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
          WebkitMaskSize: `${maskSize}px ${maskSize}px`,
          maskSize: `${maskSize}px ${maskSize}px`,
        }}
      />
      <svg
        className={styles.skeletonsGrid}
        viewBox='0 0 1440 816'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'
      >
        <path
          data-skeleton-id='darren'
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => { setIsHovered(false) }}
          d='M 110 820 C 80 730 90 700 90 650 C 100 620 100 590 110 570 L 120 510 C 90 520 60 520 30 510 C 20 490 20 460 30 430 C 50 400 70 380 90 350 C 90 350 110 330 140 320 L 180 310 L 170 280 L 160 250 L 170 220 L 180 180 C 200 160 210 170 220 170 C 240 170 250 180 260 190 L 260 240 C 260 260 260 270 250 280 L 250 300 C 270 300 290 310 310 330 Q 330 340 340 360 L 330 390 L 310 450 C 290 470 290 500 280 520 Q 280 550 300 570 L 320 570 L 330 630 L 270 820 Q 250 760 210 700 Q 180 750 180 820 L 110 820'
          fillOpacity='0'
        />
        <path
          data-skeleton-id='caleb'
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => { setIsHovered(false) }}
          d='M 572 814 C 583 748 594 693 605 671 C 605 550 605 506 616 462 C 616 440 605 429 605 429 C 616 407 616 374 610 350 C 605 330 572 308 550 310 L 520 300 L 510 290 L 510 270 L 510 260 L 520 250 C 517 242 528 220 520 210 L 520 160 L 506 143 C 484 132 473 110 420 140 C 396 176 407 198 396 209 L 396 253 L 420 280 L 429 319 C 396 330 352 341 341 374 C 330 407 308 440 300 460 C 286 484 297 495 286 506 C 286 539 286 561 300 570 C 319 572 341 572 350 560 C 308 671 308 759 297 814 L 572 814'
          fillOpacity='0'
        />
        <path
          data-skeleton-id='helen'
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => { setIsHovered(false) }}
          d='M870 135.5C860 125.5 860 125.5 810 135.5C750 145.5 750 165.5 750 155.5C720 185.5 720 225.5 720 225.5L710 405.5L680 415.5C620 485.5 650 495.5 620 635.5C570 725.5 600 735.5 570 815.5H1040L1030 685.5L1040 555.5L1030 465.5C1010 438.833 990 425.5 970 425.5C920 295.5 1000 305.5 910 165.5L870 135.5Z'
          fillOpacity='0'
        />
        <path
          data-skeleton-id='phill'
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => { setIsHovered(false) }}
          d='M 1320 820 C 1360 790 1360 740 1370 680 C 1380 590 1370 570 1370 530 C 1410 530 1410 530 1400 500 L 1370 370 L 1260 330 L 1260 310 L 1260 290 L 1270 270 L 1280 240 C 1270 220 1290 210 1270 170 C 1260 170 1260 140 1210 140 C 1180 150 1150 170 1140 190 L 1140 230 L 1150 280 L 1160 300 C 1140 300 1160 320 1140 330 C 1100 350 1060 350 1050 360 C 1020 410 1010 440 1010 450 C 1040 460 1030 500 1040 510 C 1040 560 1040 600 1030 630 L 1030 690 L 1040 820 L 1320 820'
          fillOpacity='0'
        />
      </svg>
    </div>
  )

  return <>{isDesktop ? CursorReveal : <p>tablet</p>}</>
}
