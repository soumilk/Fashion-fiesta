/*
This root-reduer is gonna be the actual code that combines all of out other states together

* A reducer is a function which actually gets two properties, a state object which represents the last state or initial state and an action, action is an object which has a type that has a string value and the chages. It also has a payload which can be anything which we want to change 
*/ 

import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';

export  default combineReducers({
  user: userReducer
});