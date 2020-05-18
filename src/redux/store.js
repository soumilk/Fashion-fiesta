import {createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares= [logger];

const store = createStore(rootReducer,applyMiddleware(...middlewares));
// We are using this syntax because in future we need to scale the middlewares.

export default store;