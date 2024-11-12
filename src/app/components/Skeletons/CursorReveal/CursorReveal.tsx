import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tooltip } from './Tooltip/Tooltip'
import { useHoveredMember } from './hooks/useHoveredMember'
import { useHoverMaskEffect } from './hooks/useHoverMaskEffect'
import { Members } from '@/helpers/constants'

import styles from './CursorReveal.module.css'

const MotionImage = motion.create(Image)

export const CursorReveal = () => {
  const { 
    hoveredMember,
    handleMemberMouseEnter,
    handleMemberMouseLeave,
  } = useHoveredMember()

  const {
    containerRef,
    maskStyles,
    handleMouseMove,
  } = useHoverMaskEffect(hoveredMember)

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
        style={maskStyles}
      />
      <svg
        className={styles.skeletonPaths}
        viewBox='0 0 1440 816'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'
      >
        {Members.map(({ id, d }) => (
          <path
            key={id}
            data-skeleton-id={id}
            onMouseEnter={() => handleMemberMouseEnter(id)}
            onMouseLeave={handleMemberMouseLeave}
            d={d}
            fillOpacity='0'
          />
        ))}
      </svg>
      <Tooltip hoveredMember={hoveredMember} />
    </div>
  )
}
