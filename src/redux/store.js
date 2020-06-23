import { createStore, applyMiddleware } from 'redux';

// This redux persist allows our browser to actually cache our store depending upon certain configuration
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// We are using this syntax because in future we need to scale the middlewares.

export const persistor = persistStore(store);
export default { store, persistor };