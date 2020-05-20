import {UserActionTypes} from './user.types';

/* This initial state is setup becasue when the first time the app initilises then it need to have an initial state
*/
const INITIAL_STATE ={
  currentUser:null
}

/* Setting up the default value as if even the state is not defined then the default state is defined*/
const userReducer = (state = INITIAL_STATE, action)=>{
  switch(action.type){
    case UserActionTypes.SET_CURRENT_USER:
      return {
        // Return a new state
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;