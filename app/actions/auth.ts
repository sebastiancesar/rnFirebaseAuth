import AsyncStorage from '@react-native-community/async-storage';
import AuthService from '../services/auth';
import { onHandledError, cleanPendingRedirects, cleanError } from '../actions/common';
import { VALID_PHONE_NUMBER, SIGNIN, SAVE_USER, SIGNOUT, 
  AuthActionsTypes, VERIFICATION_ID, VERIFIED_CODE, VERIFYING_CODE, 
  VALID_VERIFICATION_CODE, SIGNIN_RESET, WAITING_FOR_AUTH } from './auth.types';
import NavigationService from '../services/navigator';
import { HandledError } from '../services/errorHandling';
import { AuthState } from 'app/reducers/reducers.auth';

const TAG: string = 'AuthActions';

export const persistUserAction = (user: any): AuthActionsTypes => ({
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

export const validVerificationCodeAction = (verificationCode: string): AuthActionsTypes => ({
  type: VALID_VERIFICATION_CODE,
  verificationCode: verificationCode
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
  (dispatch: Function, getState: Function): void => {
    dispatch(waitingForAuth(true));
    AuthService.onAuthStateChanged((loggedUser: any) => {
      console.log(TAG, ' loadAuthUser > authStateChanged ', loggedUser);
      const hasUser = getCurrentUser(getState);
      if (loggedUser && !hasUser) {
        dispatch(persistUser(loggedUser));
        // follow pending request in case of deeplinks
        cleanPendingRedirects(dispatch, getState);
      } else if (!loggedUser && !hasUser ) {
        signOut()(dispatch);
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

export const validPhoneNumber = (phoneNumber: string): Function => 
  (dispatch: Function): void => {
    dispatch(validPhoneNumberAction(phoneNumber));
  }

export const validVerificationCode = (verificationCode: string): Function => 
  (dispatch: Function): void => {
    dispatch(validVerificationCodeAction(verificationCode));
  }

export const onSmsSent = (verificationResponse: any): Function => 
  (dispatch: Function): void => {
    dispatch(verificationIdAction(verificationResponse.verificationId));
    NavigationService.navigate('CodeVerification');
  }

export const onVerified = (user: any): Function => 
  (dispatch: Function): void => {
    dispatch(verifiedCodeAction(true));
    dispatch(persistUser(user))
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

export const persistUser = 
  (user: any): Function => (dispatch: Function): Promise<any> => 
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        dispatch(cleanError());
        dispatch(persistUserAction(user));
        return user;
      })
      .catch( err => {
        dispatch(onHandledError(err));
      });

export const getCurrentUser = (getState: Function): any => {
  const user:any = (getState().auth as AuthState).user;
  return user && user.uid;
}