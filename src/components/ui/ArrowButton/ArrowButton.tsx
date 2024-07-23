import { Icon } from '../Icon/Icon'
import styles from './ArrowButton.module.css'

interface IArrowButtonProps {
  direction: 'up' | 'right' | 'down' | 'left' 
  disabled?: boolean
  className?: string
  onClick: () => void
}

export const ArrowButton = ({
  direction,
  disabled,
  className = '',
  onClick,
  ...restProps
}: IArrowButtonProps) => {
  return (
    <button
      className={`${styles.root} ${styles[direction]} ${className}`}
      type='button'
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      <Icon
        className={styles.icon}
        glyph={`arrow-${direction}`}
        width='100%'
        height='100%'
      />
    </button>
  )
}
