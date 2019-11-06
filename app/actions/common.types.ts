import { HandledError } from "app/services/errorHandling";

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';

export const REDIRECT = 'REDIRECT';
export const REDIRECT_SUCCESS = 'REDIRECT_SUCCESS';


export type RedirectParams = {
  routeName: string,
  params?: any
}

interface RedirectActionIface {
  type: typeof REDIRECT,
  redirect: RedirectParams
}

interface RedirectSuccessActionIface {
  type: typeof REDIRECT_SUCCESS
}

interface LoadingActionIface {
  type: typeof LOADING,
  isLoading: boolean
}

interface ErrorActionIface {
  type: typeof ERROR,
  error: HandledError
}

interface CleanErrorActionIface {
  type: typeof CLEAN_ERROR,
}

export type CommonActionTypes = CleanErrorActionIface | LoadingActionIface 
  | ErrorActionIface | RedirectActionIface | RedirectSuccessActionIface;
