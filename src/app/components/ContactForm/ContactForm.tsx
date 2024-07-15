'use client'

import { TextInput } from '@/components/ui/TextInput/TextInput'
import { TextArea } from '@/components/ui/TextArea/TextArea'
import { Button } from '@/components/ui/Button/Button'
import { CustomValidationMessages } from '@/helpers/constants'
import styles from './ContactForm.module.css'

export const ContactForm = () => {
  return (
    <form
      className={styles.root}
      onSubmit={e => e.preventDefault()}
      noValidate
    >
      <TextInput
        name='name'
        // value={}
        type='text'
        error={false}
        errorMessage={CustomValidationMessages.NAME_ERROR}
        onChange={() => console.log('onChange')}
        placeholder='Your name'
        minLength={2}
        maxLength={50}
        required
      />
      <TextInput
        name='email'
        // value={}
        type='email'
        error={false}
        errorMessage={CustomValidationMessages.EMAIL_ERROR}
        onChange={() => console.log('onChange')}
        placeholder='Your email'
        required
      />
      <TextArea
        name='message'
        // value={}
        error={false}
        errorMessage={CustomValidationMessages.MESSAGE_ERROR}
        onChange={() => console.log('onChange')}
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
        disabled={true}
      >
        Send
      </Button>
    </form>
  )
}