import AsyncStorage from '@react-native-community/async-storage';
import AuthService from '../services/auth';
import { onHandledError, cleanError } from '../actions/common';
import { VALID_PHONE_NUMBER, SIGNIN, SAVE_USER, SIGNOUT, 
  AuthActionsTypes, VERIFICATION_ID, VERIFIED_CODE, VERIFYING_CODE, 
  VALID_VERIFICATION_CODE, SIGNIN_RESET, WAITING_FOR_AUTH, INVALID_VERIFICATION_CODE, INVALID_PHONE_NUMBER } from './auth.types';
import NavigationService from '../services/navigator';
import { HandledError } from '../services/errorHandling';

const TAG: string = 'AuthActions';

export const saveUserAction = (user: any): AuthActionsTypes => ({
  type: SAVE_USER,
  user
});

export const signOutAction = (): AuthActionsTypes => ({
  type: SIGNOUT
});

export const signInAction = (phoneNumber: string): AuthActionsTypes => ({
  type: SIGNIN,
  phoneNumber: phoneNumber
});

export const validPhoneNumberAction = (phoneNumber: string): AuthActionsTypes => ({
  type: VALID_PHONE_NUMBER,
  phoneNumber: phoneNumber
});

export const invalidPhoneNumberAction = (): AuthActionsTypes => ({
  type: INVALID_PHONE_NUMBER
});

export const validVerificationCodeAction = (verificationCode: string): AuthActionsTypes => ({
  type: VALID_VERIFICATION_CODE,
  verificationCode: verificationCode
});

export const invalidVerificationCodeAction = (): AuthActionsTypes => ({
  type: INVALID_VERIFICATION_CODE
});

export const verificationIdAction = (verificationId: string): AuthActionsTypes => ({
  type: VERIFICATION_ID,
  verificationId: verificationId
});

export const verifiedCodeAction = (verified: boolean): AuthActionsTypes => ({
  type: VERIFIED_CODE,
  verifiedCode: verified
});

export const verifyingCodeAction = (verifying: boolean): AuthActionsTypes => ({
  type: VERIFYING_CODE,
  verifyingCode: verifying
});

export const signInResetAction = (): AuthActionsTypes => ({
  type: SIGNIN_RESET,
});

export const waitingForAuth = (loading: boolean): AuthActionsTypes => ({
  type: WAITING_FOR_AUTH,
  loading: loading
});


export const loadAuthUser = ():Function => 
  (dispatch: Function) => {
    dispatch(waitingForAuth(true));
    AuthService.onAuthStateChanged()    
      .then((loggedUser) => {
        console.log(TAG, ' loadAuthUser > authStateChanged ', loggedUser);
        if (loggedUser) {
          dispatch(saveUser(loggedUser));
        } else {
          dispatch(signOut());
        }
      });
}

export const signOut = ():Function => (dispatch: Function): Promise<void> => 
  AuthService.signOut()
    .finally( () => {
      AsyncStorage.removeItem('user');
      dispatch(signOutAction());
      NavigationService.navigate('Auth');
    });

export const signInReset = (): Function => 
  (dispatch: Function): void => {
    dispatch(signInResetAction());
    dispatch(cleanError());
    NavigationService.navigate('Auth');
  }

export const onSmsSent = (verificationResponse: any): Function => 
  (dispatch: Function): void => {
    dispatch(verificationIdAction(verificationResponse.verificationId));
    NavigationService.navigate('CodeVerification');
  }

export const onVerified = (user: any): Function => 
  (dispatch: Function): void => {
    dispatch(verifiedCodeAction(true));
    dispatch(cleanError());
    dispatch(saveUser(user))
      .then(() => {
        NavigationService.navigate('Home');
      });
  }

export const signIn = (phoneNumber: string): Function => 
  (dispatch: Function): void => {
    const onSmsSentWrapper = (verificationId: string) => {
      dispatch(cleanError());
      dispatch(onSmsSent(verificationId));
    };
    const onVerifiedWrapper = (user: any) => {
      dispatch(cleanError());
      dispatch(onVerified(user));
    };
    const errorWrapper = (err: HandledError) => {
      dispatch(onHandledError(err));
    }
    AuthService.signIn(phoneNumber,
      onSmsSentWrapper, onVerifiedWrapper, errorWrapper);
    dispatch(signInAction(phoneNumber));
  }

export const confirmVerificationCode = 
  (verificationId: string, verificationCode: string): Function =>
    (dispatch: Function): void => {
      dispatch(verifyingCodeAction(true));
      AuthService.singInWithCredentials(verificationId, verificationCode)
        .then((userCrendentials) => {
          dispatch(onVerified(userCrendentials.user));
        })
        .catch( (err: HandledError) => {
          dispatch(onHandledError(err));
        })
        .finally( () => {
          dispatch(verifyingCodeAction(false));
        });
    }

const saveUser = 
  (user: any): Function => (dispatch: Function): Promise<any> => 
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        dispatch(saveUserAction(user));
        return user;
      })
      .catch( err => {
        dispatch(onHandledError(err));
      });
