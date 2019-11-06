import { createStore, applyMiddleware, Store, Action } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';


const logger = (store: Store) => (next: Function) => (action: Action) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const middlewares = [ReduxThunk, logger];

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;