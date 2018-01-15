import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAIL
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case ANONYMOUS_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
    case ANONYMOUS_LOGIN_FAIL:
      return { token: null };
    default:
      return state;
  }
}
