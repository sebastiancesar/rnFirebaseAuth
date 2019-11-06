import { LOADING, ERROR, CommonActionTypes, RedirectParams, REDIRECT, CLEAN_ERROR, REDIRECT_SUCCESS } from './common.types';
import NavigationService from '../services/navigator';
import { HandledError } from 'app/services/errorHandling';

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

export const redirectSuccessAction = (): CommonActionTypes => ({
  type: REDIRECT_SUCCESS
});

export const cleanError = (): Function => 
  (dispatch: Function): void => {
    dispatch(cleanErrorAction());
}

export const onHandledError = (handledError: HandledError): Function => 
  (dispatch: Function): void => {
    dispatch(handledErrorAction(handledError));
}

export const redirect = (redirect: RedirectParams): Function =>
  (dispatch: Function) => {
    dispatch(redirectAction(redirect))
    NavigationService.navigate(redirect.routeName, redirect.params);
    dispatch(redirectSuccessAction());
  }