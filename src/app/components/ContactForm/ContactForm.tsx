'use client'

import { TextInput } from '@/components/ui/TextInput/TextInput'
import { TextArea } from '@/components/ui/TextArea/TextArea'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { Loader } from '@/components/ui/Loader/Loader'
import { useFormWithValidation } from '@/helpers/hooks/useFormWithValidation'
import styles from './ContactForm.module.css'

export const ContactForm = () => {
  const {
    values,
    errors,
    isValid,
    isSubmitting,
    formSuccessfullySent,
    handleChange,
    handleSubmit,
  } = useFormWithValidation()

  return (
    <form className={styles.root} onSubmit={handleSubmit} noValidate>
      <TextInput
        name='name'
        value={values.name}
        type='text'
        error={!!errors.name}
        errorMessage={errors.name}
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
        errorMessage={errors.email}
        onChange={handleChange}
        placeholder='Your email'
        maxLength={50}
        required
      />
      <TextArea
        name='message'
        value={values.message}
        error={!!errors.message}
        errorMessage={errors.message}
        onChange={handleChange}
        placeholder='Your message'
        rows={7}
        minLength={2}
        maxLength={1000}
        required
      />
      <Button
        className={styles.submitButton}
        type='submit'
        view='secondary'
        disabled={!isValid || isSubmitting}
      >
        {formSuccessfullySent ? (
          <>
            Message sent <Icon glyph='check' width='15px' height='15px' />
          </>
        ) : (
          'Send message'
        )}
        {isSubmitting && <Loader />}
      </Button>
    </form>
  )
}
