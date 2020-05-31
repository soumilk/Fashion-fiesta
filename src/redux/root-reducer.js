
/*
This root-reduer is gonna be the actual code that combines all of out other states together

* A reducer is a function which actually gets two properties, a state object which represents the last state or initial state and an action, action is an object which has a type that has a string value and the chages. It also has a payload which can be anything which we want to change 
*/ 

import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import {persistReducer } from 'redux-persist';

// This is to specify the actual storage type (here it is localstorage)
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // it takes the parameters which we want to store
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});
export  default persistReducer(persistConfig, rootReducer);