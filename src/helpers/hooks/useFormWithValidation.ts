import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

interface IContactFormFields {
  name: string
  email: string
  message: string
}

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target
    const name = target.name
    const value = target.value

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
      .then(() => resetForm())
      .catch(error => console.log(error))
      .finally(() => setIsSubmitting(false))
  }

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}
