import Image from 'next/image'
import { motion } from 'framer-motion'
import { headingVariants, imageVariants, textVariants } from './Tooltip.variants'
import { IMember } from '@/helpers/types'

import styles from './Tooltip.module.css'

interface ITooltipProps {
  hoveredMember: IMember | null
}

const MotionImage = motion.create(Image)

export const Tooltip = ({ hoveredMember }: ITooltipProps) => {
  if (!hoveredMember) {
    return (
      <aside className={styles.root}>
        <div className={styles.imageWrapper}>
          <MotionImage
            className={styles.image}
            src='/images/cursor.jpg'
            alt='Cursor icon'
            fill
            variants={imageVariants}
            initial='initial'
            animate='animate'
          />
        </div>
        <p className={styles.heading}>Move around to explore</p>
      </aside>
    )
  }

  const { name, role, imageUrl } = hoveredMember

  return (
    <motion.aside className={styles.root} initial='initial' animate='animate'>
      <div className={styles.imageWrapper}>
        <MotionImage
          className={styles.image}
          src={imageUrl}
          alt={name}
          fill
          key={imageUrl}
          variants={imageVariants}
        />
      </div>
      <dl>
        <motion.dt className={styles.heading} key={name} variants={headingVariants}>
          {name}
        </motion.dt>
        <motion.dd className={styles.text} key={role} variants={textVariants}>
          {role}
        </motion.dd>
      </dl>
    </motion.aside>
  )
}
