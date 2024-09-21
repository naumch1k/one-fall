'use client'

import { TextInput } from '@/components/ui/TextInput/TextInput'
import { TextArea } from '@/components/ui/TextArea/TextArea'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { useFormWithValidation } from '@/helpers/hooks/useFormWithValidation'
import styles from './ContactForm.module.css'

export const ContactForm = () => {
  const {
    fields,
    isValid,
    isSubmitting,
    formSuccessfullySent,
    handleFieldChange,
    handleSubmit,
  } = useFormWithValidation()
  const { name, email, message } = fields

  return (
    <form className={styles.root} onSubmit={handleSubmit} noValidate>
      <TextInput
        name='name'
        value={name.value}
        type='text'
        errorMessage={name.error}
        onChange={handleFieldChange('name')}
        placeholder='Your name'
        required
      />
      <TextInput
        name='email'
        value={email.value}
        type='email'
        errorMessage={email.error}
        onChange={handleFieldChange('email')}
        placeholder='Your email'
        required
      />
      <TextArea
        name='message'
        value={message.value}
        errorMessage={message.error}
        onChange={handleFieldChange('message')}
        placeholder='Your message'
        rows={7}
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
          isSubmitting ? 'Sending message...' : 'Send message'
        )}
      </Button>
    </form>
  )
}
