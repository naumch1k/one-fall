import FocusLock from 'react-focus-lock'
import { Portal } from '../Portal/Portal'
import { OverlayToggle } from '../OverlayToggle/OverlayToggle'
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
      <FocusLock returnFocus>
        <div className={styles.root} onClick={onBackdropClick}>
          <OverlayToggle
            ariaLabel='Close Modal'
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </OverlayToggle>
          <div className={styles[variant]}>
            {children}
          </div>
        </div>
      </FocusLock>
    </Portal>
  )
}
