const errorCodes = {
  'generic-error': 'Ops, there was a problem with that. Please try again in a moment',
  'auth/invalid-verification-code': 'The verification code inserted is not valid. Please try again or press resend to request a new code.',
  'auth/user-token-invalid': 'There was a problem accessing the user\'s token, please sing in again',
  'auth/invalid-phone-number': 'Invalid phone number',
  'auth/app-not-authorized': 'App not authorized to connect with firebase (Are you running this on a emulator?)'
};

export type HandledError = {
  message: string,
  code: string
};

export default class ErrorHandlingService {

  static getFormatedError(error: any): HandledError {
    const code = error.code || 'generic-error'; 
    return {
      code: code,
      message: ErrorHandlingService.getMessageForCode(code)
    }
  }

  static getMessageForCode(code: string): string {
    return errorCodes[code];
  }

}