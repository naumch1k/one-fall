import FocusLock from 'react-focus-lock'
import { Portal } from '../Portal/Portal'
import { Icon } from '../Icon/Icon'
import styles from './Modal.module.css'

interface IModalProps {
  variant: 'lightbox' | 'dialog'
  isOpen: boolean
  onClose: () => void
  onBackdropClick: React.MouseEventHandler<HTMLDivElement>
  children: React.ReactNode
}

export const Modal = ({
  variant,
  isOpen,
  onClose,
  onBackdropClick,
  children,
}: IModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <FocusLock
        returnFocus={suggestedNode => {
          setTimeout(() => (suggestedNode as HTMLElement).blur(), 0)
          return true
        }}
      >
        <div className={styles.root} onClick={onBackdropClick}>
          <button
            className={styles.closeButton}
            type='button'
            aria-label='Close Modal'
            onClick={onClose}
          >
            <Icon glyph='x' width='100%' height='100%' />
          </button>
          <div className={styles[variant]}>{children}</div>
        </div>
      </FocusLock>
    </Portal>
  )
}
