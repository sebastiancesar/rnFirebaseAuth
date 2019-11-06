import { combineReducers }  from 'redux';
import { LOADING, ERROR, CommonActionTypes, REDIRECT, RedirectParams, CLEAN_ERROR, REDIRECT_SUCCESS } from '../actions/common.types';
import { authReducer, AuthState } from './reducers.auth';
import { HandledError } from 'app/services/errorHandling';


export type AppState = {
  auth: AuthState,
  common: CommonState,
};

export type CommonState = {
  loading: boolean,
  error: HandledError | null,
  redirect: RedirectParams | null
}

const commonInitialState = () => ({
  loading: false,
  error: null,
  redirect: null
});

const commonReducer = (state: CommonState = commonInitialState(), 
  action: CommonActionTypes) => {
    switch(action.type) {
      case REDIRECT:
        return { ...state, redirect: action.redirect };
      case REDIRECT_SUCCESS:
        return { ...state, redirect: null };
      case LOADING:
        return {...state, loading: action.isLoading };
      case ERROR:
        return {...state, error: action.error };
      case CLEAN_ERROR:
          return {...state, error: null };
      default:
        return state;
    }
}

export default combineReducers({ 
  auth: authReducer,
  common: commonReducer
 });