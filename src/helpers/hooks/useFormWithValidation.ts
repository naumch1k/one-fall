import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

interface IContactFormFields {
  name: string
  email: string
  message: string
}

const CONTACT_FORM_RESET_TIMEOUT = 10000

const initialValues: IContactFormFields = {
  name: '',
  email: '',
  message: '',
}

export const useFormWithValidation = () => {
  const [values, setValues] = useState<IContactFormFields>(initialValues)
  const [errors, setErrors] = useState<Partial<IContactFormFields>>({})
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccessfullySent, setFormSuccessfullySent] = useState(false)

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target

    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: target.validationMessage })
    setIsValid(target.closest('form')!.checkValidity())
  }

  const resetForm = useCallback(
    (
      newErrors: Partial<IContactFormFields> = {},
      newIsValid: boolean = false
    ) => {
      setValues(initialValues)
      setErrors(newErrors)
      setIsValid(newIsValid)

      setTimeout(() => setFormSuccessfullySent(false), CONTACT_FORM_RESET_TIMEOUT)
    },
    [setValues, setErrors, setIsValid]
  )

  // TODO: replace with email sending service
  const simulateFormSubmission = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000)
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    simulateFormSubmission()
      .then(() => {
        setFormSuccessfullySent(true)
        resetForm()
      })
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false))
  }

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    formSuccessfullySent,
    handleChange,
    handleSubmit,
  }
}
