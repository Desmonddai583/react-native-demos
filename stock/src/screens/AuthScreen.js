import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  TextInput,
  StyleSheet, 
  Image,
  Text,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import { Button, SocialIcon } from 'react-native-elements';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import * as actions from '../actions';

const ROUTE_NAME = 'auth';

class AuthScreen extends Component {
  state = { loggedIn: null }

  componentDidMount() {
    this.props.screenProps.navigationEvents.addListener(`onFocus:${ROUTE_NAME}`, this.onFocus);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedIn: nextProps.loggedIn
    });
    this.onAuthComplete(nextProps);
  }

  onFocus = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.accountLogin();
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  onAuthComplete(props) {
    if (props.loggedInFail) {
      Alert.alert(
        'Login Fail',
        'Login credential is invalid, please re-login.',
        [
          { text: 'Ok', 
            style: 'cancel'
          }
        ]
      );
    } 
    if (props.loggedIn) {
      this.props.navigation.navigate('stock');
    }
    if (props.firebaseConnectionError) {
      this.setState({
        firebaseConnectionError: true
      });
      this.props.anonymousLogin();
    }
  }

  anonymousLogin = () => {
    this.props.doAnonymousLogin();
  }

  render() {
    if (_.isNil(this.state.loggedIn)) {
      return <AppLoading />;
    }
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{}}
        horizontal={false}
        showsVerticalScrollIndicator
      >
        <View style={styles.header}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={require('../../res/images/react-logo.png')}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            ref="email"
            autoCapitalize="none"
            placeholder="Email"
            autoCorrect={false}
            style={styles.inputText}
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            ref="password"
            autoCapitalize="none"
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry
            style={styles.inputText}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <Button
          rounded
          containerViewStyle={{ marginTop: 5 }}
          backgroundColor='#0095EE'
          title='Login' 
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, marginTop: 10 }}>
          <SocialIcon
            type='facebook'
          />
          <SocialIcon
            type='google-plus-official'
          />
          <SocialIcon
            type='twitter'
          />
          <SocialIcon
            type='github'
          />
        </View>
        <View 
          style={{ 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center',
            flex: 1, 
            marginTop: 15 
          }}
        >
          <Text style={{ fontSize: 14 }}>Don't have an account?</Text>
          <Button
            fontSize='14'
            containerViewStyle={{ padding: 0 }}
            buttonStyle={{ padding: 0 }}
            transparent
            color='#3FBCF9'
            title='Sign Up Here' 
          />
        </View>
        <View>
          <Button
            fontSize='14'
            containerViewStyle={{ padding: 0, marginTop: 15 }}
            buttonStyle={{ padding: 0 }}
            transparent
            color='#3FBCF9'
            onPress={this.anonymousLogin}
            title='Skip' 
          />
        </View>
        <View>
          <Modal isVisible={this.props.firebaseConnectionError}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 20 }}>Fail to connect server.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Progress.CircleSnail />
                <Text 
                  style={{ fontSize: 16, color: '#777777', marginLeft: 10 }}
                >
                  Retrying, please wait...
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  header: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '900',
  },
  inputRow: {
    height: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    borderRadius: 3,
  },
  inputText: {
    flex: 1,
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 3,
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#333333',
  },
  bigBtn: {
    color: '#ffffff',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});

function mapStateToProps({ auth }) {
  return { 
    loggedIn: auth.loggedIn, 
    firebaseConnectionError: auth.firebaseConnectionError,
    loggedInFail: auth.loggedInFail
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);
