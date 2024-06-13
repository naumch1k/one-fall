import { Portal } from '../Portal/Portal'
import { OverlayToggle } from '../OverlayToggle/OverlayToggle'
import styles from './Modal.module.css'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  onBackdropClick: React.MouseEventHandler<HTMLDivElement>
  children: React.ReactNode
}

export const Modal = ({
  isOpen,
  onClose,
  onBackdropClick,
  children,
}: IModalProps) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles.root} onClick={onBackdropClick}>
        <OverlayToggle
          ariaLabel='Close Modal'
          className={styles.closeButton}
          onClick={onClose}
        >
          Close
        </OverlayToggle>
        {children}
      </div>
    </Portal>
  )
}
