export const CustomValidationMessages = {
  name: {
    VALUE_MISSING: 'Please include your name',
    TOO_SHORT: 'Name should have at least 2 letters',
    TOO_LONG: 'Name should have a maximum of 50 letters',
    PATTERN_MISMATCH: "Name can only include letters, spaces, and these: ' ’ -",
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
      'Yikes! Only letters, numbers, spaces, and \' ’ " , . ! ? - are allowed',
  },
  SUBMIT_SUCCESS: 'Your message successfully sent!',
  SUBMIT_FAILURE: "Something went wrong. We're working to resolve the issue.",
}
