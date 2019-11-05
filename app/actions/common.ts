import { LOADING, ERROR, CommonActionTypes, RedirectParams, REDIRECT, CLEAN_ERROR } from './common.types';
import NavigationService from '../services/navigator';
import { CommonState } from '../reducers/reducers';
import { AuthState } from '../reducers/reducers.auth';
import { HandledError } from 'app/services/errorHandling';
import { getCurrentUser } from './auth';

const TAG: string = 'CommonActions';

export const loading = (isLoading: boolean): CommonActionTypes => ({
  type: LOADING,
  isLoading
}); 

export const handledErrorAction = (error: HandledError): CommonActionTypes => ({
  type: ERROR,
  error
});

export const cleanErrorAction = (): CommonActionTypes => ({
  type: CLEAN_ERROR
});

export const redirectAction = (redirect: RedirectParams): CommonActionTypes => ({
  type: REDIRECT,
  redirect
});

export const cleanError = (): Function => 
  (dispatch: Function): void => {
    dispatch(cleanErrorAction());
}

export const onHandledError = (handledError: HandledError): Function => 
  (dispatch: Function): void => {
    dispatch(handledErrorAction(handledError));
}

export const cleanPendingRedirects = (dispatch: Function, getState: Function): void => {
  const { redirect } = getState().common as CommonState;
  if (redirect) {
    console.log(TAG, ' > cleanPendingRedirect ', redirect)
    NavigationService.navigate(redirect.routeName, redirect.params);
    dispatch(redirectAction(null));
  }
}

export const redirect = (redirect: RedirectParams): Function =>
  (dispatch: Function, getState:Function ) => {
    const hasUser = getCurrentUser(getState);
    dispatch(redirectAction(redirect))
    if (hasUser) {
      NavigationService.navigate(redirect.routeName, redirect.params);
      dispatch(redirectAction(null));
    } 
  }