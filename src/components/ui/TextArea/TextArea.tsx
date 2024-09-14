import { TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error: boolean
  errorMessage: string | undefined
}

export const TextArea = ({
  error,
  errorMessage,
  ...restProps
}: ITextAreaProps) => (
  <div>
    <textarea
      className={`${styles.root} ${error ? styles.invalid : ''}`}
      {...restProps}
    />
    <p className={styles.error}>{error && errorMessage}</p>
  </div>
)
