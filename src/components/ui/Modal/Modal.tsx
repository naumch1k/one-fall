import FocusLock from 'react-focus-lock'
import { Portal } from '../Portal/Portal'
import { Icon } from '../Icon/Icon'
import styles from './Modal.module.css'
import { CloseButton } from '../CloseButton/CloseButton'

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
          <div className={styles[variant]}>{children}</div>
          <CloseButton
            className={styles.closeButton}
            ariaLabel='Close modal'
            onClick={onClose}
          />
        </div>
      </FocusLock>
    </Portal>
  )
}
