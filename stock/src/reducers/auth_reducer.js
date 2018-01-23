import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAIL,
  FIREBASE_CONNECTION_FAIL,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case ANONYMOUS_LOGIN_SUCCESS:
      return { ...state, loggedIn: true, loggedInFail: false, firebaseConnectionError: false };
    case FACEBOOK_LOGIN_FAIL:
    case ANONYMOUS_LOGIN_FAIL:
      return { ...state, loggedIn: false, loggedInFail: true };
    case FIREBASE_CONNECTION_FAIL:
      return { ...state, loggedIn: false, firebaseConnectionError: true };
    default:
      return state;
  }
}
