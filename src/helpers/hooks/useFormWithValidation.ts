import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { CustomValidationMessages } from '../constants'

const CONTACT_FORM_RESET_TIMEOUT = 10000

interface ContactFormFields {
  name: string
  email: string
  message: string
}

type FormFieldState<T> = {
  [K in keyof T]: {
    value: T[K]
    wasChanged: boolean
    error?: string
  }
}

type ContactFormFieldsState = FormFieldState<ContactFormFields>

interface ContactFormState {
  fields: ContactFormFieldsState
  isSubmitting: boolean
  formSuccessfullySent: boolean
  submissionError?: string
}

type ContactFormAction<K extends keyof ContactFormFields = keyof ContactFormFields> =
  | { type: 'UPDATE_FIELD'; payload: { field: K; value: ContactFormFields[K]; error?: string }}
  | { type: 'START_FORM_SUBMISSION' }
  | { type: 'SET_FORM_SUBMISSION_SUCCESS' }
  | { type: 'SET_FORM_SUBMISSION_FAILURE'; payload: { error: string } }
  | { type: 'COMPLETE_FORM_SUBMISSION' }

const initialContactFormFieldsState: ContactFormFieldsState = {
  name: { value: '', wasChanged: false },
  email: { value: '', wasChanged: false },
  message: { value: '', wasChanged: false },
}

const initialContactFormState: ContactFormState = {
  fields: initialContactFormFieldsState,
  isSubmitting: false,
  formSuccessfullySent: false,
}

const reducer = (state: ContactFormState, action: ContactFormAction) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            value: action.payload.value,
            wasChanged: true,
            error: action.payload.error || '',
          },
        },
      }
    case 'START_FORM_SUBMISSION':
      return {
        ...state,
        isSubmitting: true,
      }
    case 'SET_FORM_SUBMISSION_SUCCESS':
      return {
        ...state,
        fields: initialContactFormFieldsState,
        isSubmitting: false,
        formSuccessfullySent: true,
      }
    case 'SET_FORM_SUBMISSION_FAILURE':
      return {
        ...state,
        isSubmitting: false,
        submissionError: action.payload.error,
      }
    case 'COMPLETE_FORM_SUBMISSION':
      return {
        ...state,
        formSuccessfullySent: false,
      }
    default:
      return state
  }
}

export const useFormWithValidation = () => {
  const [state, dispatch] = useReducer(reducer, initialContactFormState)

  const getFieldError = <K extends keyof ContactFormFields>(
    field: K,
    value: ContactFormFields[K]
  ) => {
    const trimmedValue = value.trim()
    const { name, email, message } = CustomValidationMessages

    switch (field) {
      case 'name':
        if (!trimmedValue) return name.VALUE_MISSING
        if (trimmedValue.length < 2) return name.TOO_SHORT
        if (trimmedValue.length > 50) return name.TOO_LONG
        break
      case 'email':
        if (!trimmedValue) return email.VALUE_MISSING
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/.test(trimmedValue)) return email.PATTERN_MISMATCH
        break
      case 'message':
        if (!trimmedValue) return message.VALUE_MISSING
        if (trimmedValue.length < 2) return message.TOO_SHORT
        if (trimmedValue.length > 500) return message.TOO_LONG
        break
      default:
        return
    }
  }

  const handleFieldChange = <K extends keyof ContactFormFields>(field: K) => ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field,
        value,
        error: getFieldError(field, value),
      },
    })
  }

  const isValid = useMemo(() => {
    return Object.values(state.fields).every(
      ({ wasChanged, error }) => wasChanged && !error
    )
  }, [state.fields])

  // TODO: replace with email sending service
  const simulateFormSubmission = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000)
    })

    // return new Promise<void>((_, reject) => {
    //   setTimeout(() => reject(new Error(CustomValidationMessages.SUBMIT_FAILURE)), 2000)
    // })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'START_FORM_SUBMISSION' })

    simulateFormSubmission()
      .then(() => dispatch({ type: 'SET_FORM_SUBMISSION_SUCCESS' }))
      .catch(error => {
        dispatch({
          type: 'SET_FORM_SUBMISSION_FAILURE',
          payload: { error: error.message || CustomValidationMessages.SUBMIT_FAILURE },
        })
      })
  }

  // Set timeout to reset button text based on formSuccessfullySent
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
  
    if (state.formSuccessfullySent) {
      timeoutId = setTimeout(
        () => dispatch({ type: 'COMPLETE_FORM_SUBMISSION' }),
        CONTACT_FORM_RESET_TIMEOUT
      )
    }
  
    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId)
  }, [state.formSuccessfullySent])

  return {
    fields: state.fields,
    isValid,
    isSubmitting: state.isSubmitting,
    formSuccessfullySent: state.formSuccessfullySent,
    handleFieldChange,
    handleSubmit,
  }
}
