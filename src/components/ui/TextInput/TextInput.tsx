import { InputHTMLAttributes } from 'react'
import styles from './TextInput.module.css'

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'email'
  errorMessage?: string
}

export const TextInput = ({
  type,
  errorMessage,
  ...props
}: ITextInputProps) => (
  <div>
    <input
      className={`${styles.root} ${errorMessage ? styles.invalid : ''}`}
      type={type}
      {...props}
    />
    <p className={styles.error}>{errorMessage}</p>
  </div>
)
