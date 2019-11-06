export const SAVE_USER = 'SAVE_USER';
export const SIGNOUT = 'SIGNOUT';
export const SIGNIN = 'SIGNIN';
export const SIGNIN_RESET = 'SIGNIN_RESET';
export const VERIFICATION_ID = 'VERIFICATION_ID';
export const VERIFIED_CODE = 'VERIFIED_CODE';
export const VERIFYING_CODE = 'VERIFYING_CODE';
export const VALID_PHONE_NUMBER = 'VALID_PHONE_NUMBER'; 
export const INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER';
export const VALID_VERIFICATION_CODE = 'VALID_VERIFICATION_CODE'; 
export const INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE'; 
export const WAITING_FOR_AUTH = 'WAITING_FOR_AUTH'; 


interface WaitingAuthUserActionIface {
  type: typeof WAITING_FOR_AUTH,
  loading: boolean
}
interface SaveUserActionIface {
  type: typeof SAVE_USER,
  user: any
}

interface SignOutActionIface {
  type: typeof SIGNOUT
}

interface SignInActionIface {
  type: typeof SIGNIN,
  phoneNumber: string
}

interface SignInResetActionIface {
  type: typeof SIGNIN_RESET
}

interface VerificationIdActionIface {
  type: typeof VERIFICATION_ID,
  verificationId: string
}

interface VerifiedCodeActionIface {
  type: typeof VERIFIED_CODE,
  verifiedCode: boolean
}

interface VerifyingCodeActionIface {
  type: typeof VERIFYING_CODE,
  verifyingCode: boolean
}

interface ValidPhoneNumberActionIface {
  type: typeof VALID_PHONE_NUMBER,
  phoneNumber: string
}

interface InvalidPhoneNumberActionIface {
  type: typeof INVALID_PHONE_NUMBER,
}
interface ValidVerificationCodeActionIface {
  type: typeof VALID_VERIFICATION_CODE
  verificationCode: string
}

interface InvalidVerificationCodeActionIface {
  type: typeof INVALID_VERIFICATION_CODE
}

export type AuthActionsTypes = | SaveUserActionIface | SignOutActionIface 
  | SignInActionIface | VerificationIdActionIface | VerifiedCodeActionIface 
  | VerifyingCodeActionIface | ValidPhoneNumberActionIface | WaitingAuthUserActionIface
  | ValidVerificationCodeActionIface | SignInResetActionIface 
  | InvalidVerificationCodeActionIface | InvalidPhoneNumberActionIface;