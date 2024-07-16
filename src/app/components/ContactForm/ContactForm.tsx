'use client'

import { TextInput } from '@/components/ui/TextInput/TextInput'
import { TextArea } from '@/components/ui/TextArea/TextArea'
import { Button } from '@/components/ui/Button/Button'
import { useFormWithValidation } from '@/helpers/hooks/useFormWithValidation'
import { CustomValidationMessages } from '@/helpers/constants'
import styles from './ContactForm.module.css'

export const ContactForm = () => {
  const {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormWithValidation()

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit}
      noValidate
    >
      <TextInput
        name='name'
        value={values.name}
        type='text'
        error={!!errors.name}
        errorMessage={CustomValidationMessages.NAME_ERROR}
        onChange={handleChange}
        placeholder='Your name'
        minLength={2}
        maxLength={50}
        required
      />
      <TextInput
        name='email'
        value={values.email}
        type='email'
        error={!!errors.email}
        errorMessage={CustomValidationMessages.EMAIL_ERROR}
        onChange={handleChange}
        placeholder='Your email'
        required
      />
      <TextArea
        name='message'
        value={values.message}
        error={!!errors.message}
        errorMessage={CustomValidationMessages.MESSAGE_ERROR}
        onChange={handleChange}
        placeholder='Your message'
        rows={7}
        minLength={2}
        maxLength={1000}
        required
      />
      {/* TODO: notify user of form submission status */}
      <Button
        className={styles.submitButton}
        type='submit'
        view='secondary'
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>
    </form>
  )
}