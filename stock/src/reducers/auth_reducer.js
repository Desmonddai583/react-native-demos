import { 
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
  FIREBASE_CONNECTION_FAIL,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ACCOUNT_LOGIN_SUCCESS:
      return { 
        ...state, 
        loggedIn: true, 
        loggedInFail: false, 
        firebaseConnectionError: false
      };
    case ACCOUNT_LOGIN_FAIL:
      return { 
        ...state, 
        loggedIn: false, 
        loggedInFail: true 
      };
    case FIREBASE_CONNECTION_FAIL:
      return { 
        ...state, 
        loggedIn: false, 
        firebaseConnectionError: true 
      };
    default:
      return state;
  }
}
