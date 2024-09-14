import {
  useCallback,
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
} from 'react'
import { CustomValidationMessages } from '../constants'

interface IContactFormFields {
  name: string
  email: string
  message: string
}

interface IReducerState {
  values: IContactFormFields
  errors: Partial<IContactFormFields>
  isValid: boolean
  isSubmitting: boolean
  formSuccessfullySent: boolean
}

type Action =
  | {
      type: 'SET_FIELD_VALUE'
      payload: { field: keyof IContactFormFields; value: string }
    }
  | { type: 'SET_ERRORS'; payload: { errors: Partial<IContactFormFields> } }
  | { type: 'SET_IS_VALID'; payload: { isValid: boolean } }
  | { type: 'SET_IS_SUBMITTING'; payload: { isSubmitting: boolean } }
  | {
      type: 'RESET_FORM'
      payload: { errors: Partial<IContactFormFields>; isValid: boolean }
    }
  | { type: 'SET_FORM_SUCCESS'; payload: { success: boolean } }

const CONTACT_FORM_RESET_TIMEOUT = 10000

const initialValues: IContactFormFields = {
  name: '',
  email: '',
  message: '',
}

const initialState: IReducerState = {
  values: initialValues,
  errors: {},
  isValid: false,
  isSubmitting: false,
  formSuccessfullySent: false,
}

const formReducer = (state: IReducerState, action: Action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload.errors,
      }
    case 'SET_IS_VALID':
      return {
        ...state,
        isValid: action.payload.isValid,
      }
    case 'SET_IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload.isSubmitting,
      }
    case 'RESET_FORM':
      return {
        ...state,
        values: initialValues,
        errors: action.payload.errors,
        isValid: action.payload.isValid,
      }
    case 'SET_FORM_SUCCESS':
      return {
        ...state,
        formSuccessfullySent: action.payload.success,
      }
  }
}

export const useFormWithValidation = () => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target

    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { field: name as keyof IContactFormFields, value },
    })

    checkFieldForErrors(name as keyof IContactFormFields, value)
  }

  const checkFieldForErrors = (
    field: keyof IContactFormFields,
    value: string
  ) => {
    const trimmedValue = value.trim()
    let fieldErrors: Partial<IContactFormFields> = { ...state.errors }

    if (validationRules[field]) {
      const errorMessage = validationRules[field](trimmedValue)
      fieldErrors[field] = errorMessage || ''
    }

    dispatch({ type: 'SET_ERRORS', payload: { errors: fieldErrors } })
  }

  const validationRules: { [key: string]: (value: string) => string | null } = {
    name: value => {
      if (!value) return CustomValidationMessages.NAME_ERROR
      if (value.length < 2) return CustomValidationMessages.NAME_ERROR_MIN
      if (value.length > 50) return CustomValidationMessages.NAME_ERROR_MAX
      return null
    },
    email: value => {
      if (!value) return CustomValidationMessages.EMAIL_ERROR
      if (value.length > 50) return CustomValidationMessages.EMAIL_ERROR_MAX
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/.test(value))
        return CustomValidationMessages.EMAIL_ERROR_MATCH
      return null
    },
    message: value => {
      if (!value) return CustomValidationMessages.MESSAGE_ERROR
      if (value.length < 2) return CustomValidationMessages.MESSAGE_ERROR_MIN
      if (value.length > 1000) return CustomValidationMessages.MESSAGE_ERROR_MAX
      return null
    },
  }

  useEffect(() => {
    const formIsValid =
      Object.values(state.errors).every(error => !error) &&
      state.values.name.trim() !== '' &&
      state.values.email.trim() !== '' &&
      state.values.message.trim() !== ''
    dispatch({ type: 'SET_IS_VALID', payload: { isValid: formIsValid } })
  }, [state.values, state.errors])

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM', payload: { errors: {}, isValid: false } })

    setTimeout(
      () => dispatch({ type: 'SET_FORM_SUCCESS', payload: { success: false } }),
      CONTACT_FORM_RESET_TIMEOUT
    )
  }, [])

  // TODO: replace with email sending service
  const simulateFormSubmission = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000)
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'SET_IS_SUBMITTING', payload: { isSubmitting: true } })

    simulateFormSubmission()
      .then(() => {
        dispatch({ type: 'SET_FORM_SUCCESS', payload: { success: true } })
        resetForm()
      })
      .catch(error => console.log(error))
      .finally(() =>
        dispatch({
          type: 'SET_IS_SUBMITTING',
          payload: { isSubmitting: false },
        })
      )
  }

  return {
    values: state.values,
    errors: state.errors,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    formSuccessfullySent: state.formSuccessfullySent,
    handleChange,
    handleSubmit,
  }
}
