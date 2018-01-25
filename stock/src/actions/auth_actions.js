import firebase from 'firebase';
import UserSocket from '../services/websocket/UserSocket.js';
import {
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
  FIREBASE_CONNECTION_FAIL,
} from './types';

export const accountLogin = () => async dispatch => {
  joinChannel(dispatch);
};

export const doAnonymousLogin = () => async dispatch => {
  try {
    await firebase.auth().signInAnonymously();
    joinChannel(dispatch);
  } catch (error) {
    return dispatch({ type: FIREBASE_CONNECTION_FAIL });
  }
};

const joinChannel = async dispatch => {
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  const uid = firebase.auth().currentUser.uid;
  const socket = new UserSocket(idToken, uid);
  socket.channel.join()
    .receive('ok', () => { 
      dispatch({ type: ACCOUNT_LOGIN_SUCCESS });
    })
    .receive('error', async () => {
      const error = await firebase.auth().signOut();
      if (error) {
        return dispatch({ type: FIREBASE_CONNECTION_FAIL });
      }
      socket.channel.leave();
      return dispatch({ type: ACCOUNT_LOGIN_FAIL });
    });
};
