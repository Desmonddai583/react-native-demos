import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';

import UserSocket from '../services/websocket/UserSocket.js';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAIL,
  FIREBASE_CONNECTION_FAIL
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
  await firebase.auth().onAuthStateChanged(async(user) => {
    if (user) {
      // try {
      //   const idToken = await firebase.auth().currentUser.getIdToken(true);
      //   const socket = new UserSocket(idToken, user.uid);
      //   socket.channel.join()
      //     .receive('ok', () => { dispatch({ type: ANONYMOUS_LOGIN_SUCCESS }); })
      //     .receive('error', () => { dispatch({ type: ANONYMOUS_LOGIN_FAIL }); });
      // } catch (error) {
        return dispatch({ type: FIREBASE_CONNECTION_FAIL });
      // }
    } else {
      doAnonymousLogin(dispatch);
    }
  });
};

const doAnonymousLogin = async dispatch => {
  try {
    await firebase.auth().signInAnonymously();
    dispatch({ type: ANONYMOUS_LOGIN_SUCCESS });
  } catch (error) {
    return dispatch({ type: FIREBASE_CONNECTION_FAIL });
  }
};
