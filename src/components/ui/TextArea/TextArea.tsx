import { TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
}

export const TextArea = ({
  errorMessage,
  ...props
}: ITextAreaProps) => (
  <div>
    <textarea
      className={`${styles.root} ${errorMessage ? styles.invalid : ''}`}
      {...props}
    />
    <p className={styles.error}>{errorMessage}</p>
  </div>
)
