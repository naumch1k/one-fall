import { InputHTMLAttributes } from 'react'
import styles from './TextInput.module.css'

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement>{
  type: 'text' | 'email'
  error: boolean
  errorMessage: string
}

export const TextInput = ({
  type,
  error,
  errorMessage,
  ...restProps
}: ITextInputProps) => (
  <div>
    <input
      className={`${styles.root} ${error ? styles.invalid : ''}`}
      type={type}
      {...restProps}
    />
    <p className={styles.error}>
      {error && errorMessage}
    </p>
  </div>
)
