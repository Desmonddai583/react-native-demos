import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');
  
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('123812135065657', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export const anonymousLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('anonymous_token');
  
  if (token) {
    dispatch({ type: ANONYMOUS_LOGIN_SUCCESS, payload: token });
  } else {
    doAnonymousLogin(dispatch);
  }
};

const doAnonymousLogin = async dispatch => {
  try {
    const user = await firebase.auth().signInAnonymously();
    const token = user.uid;
    await AsyncStorage.setItem('anonymous_token', token);
    dispatch({ type: ANONYMOUS_LOGIN_SUCCESS, payload: token });
  } catch (error) {
    return dispatch({ type: ANONYMOUS_LOGIN_FAIL });
  }
};
