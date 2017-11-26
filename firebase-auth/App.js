import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBi-125mLhxyiPqVYucnufenZ1gbeAuzjQ",
      authDomain: "one-time-password-cf3cc.firebaseapp.com",
      databaseURL: "https://one-time-password-cf3cc.firebaseio.com",
      projectId: "one-time-password-cf3cc",
      storageBucket: "one-time-password-cf3cc.appspot.com",
      messagingSenderId: "344468271785"
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
