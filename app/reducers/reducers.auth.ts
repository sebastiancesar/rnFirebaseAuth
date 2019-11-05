import { AuthActionsTypes, VERIFICATION_ID, SIGNIN, 
  SAVE_USER, SIGNOUT, VALID_PHONE_NUMBER, 
  VALID_VERIFICATION_CODE, 
  SIGNIN_RESET} from '../actions/auth.types';

export type AuthState = {
  user: object,
  login: {
    phoneNumber: string | null,
    verificationId: string | null,
    verificationCode: string | null,
    verifyingCode: boolean,
    codeVerified: boolean
  }
}

const initialState: Function = (): AuthState => ({
  login: { 
    phoneNumber: null,
    verificationId: null,
    verificationCode: null,
    verifyingCode: false,
    codeVerified: false
  },
  user: {}
});

export const authReducer = (state: AuthState = initialState(), 
  action: AuthActionsTypes) => {
    switch (action.type) {
      case VERIFICATION_ID:
        return { ...state,
          login: {
            ...state.login,
            verificationId: action.verificationId
          }
        }
      case VALID_PHONE_NUMBER:
        return { ...state,
          login: {
            ...state.login,
            phoneNumber: action.phoneNumber 
          }
        };
      case VALID_VERIFICATION_CODE:
        return { ...state,
          login: {
            ...state.login,
            verificationCode: action.verificationCode 
          }
        };
      case SIGNIN:
        return {
          ...state,
          login: {
            ...state.login,
            phoneNumber: action.phoneNumber
          }
        }
      case SIGNIN_RESET:
        return initialState();
      case SIGNOUT:
          return {...state, user: 'signedOut' };
      case SAVE_USER:
        return {...state, user: action.user };
      default:
        return state;
    }
}