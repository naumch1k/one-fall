export const CustomValidationMessages = {
  name: {
    VALUE_MISSING: 'Please include your name',
    TOO_SHORT: 'Name should have at least 2 letters',
    TOO_LONG: 'Name should have a maximum of 50 letters',
    PATTERN_MISMATCH:
      'Please use only latin letters. Special characters are not allowed',
  },
  email: {
    VALUE_MISSING: 'Please include your email',
    PATTERN_MISMATCH: 'Please enter a valid email address',
  },
  message: {
    VALUE_MISSING: 'Please include your message',
    TOO_SHORT: 'Message should have at least 2 letters',
    TOO_LONG: 'Message cannot exceed 1000 letters',
    PATTERN_MISMATCH:
      'Please use only latin letters. Special characters are not allowed',
  },
  SUBMIT_SUCCESS: 'Your message successfully sent!',
  SUBMIT_FAILURE:
    "Oops! Something went wrong. We're working to resolve the issue.",
}
