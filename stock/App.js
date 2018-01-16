import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import StockScreen from './src/screens/StockScreen';
import StockDetailScreen from './src/screens/Stock/StockDetailScreen';
import SettingScreen from './src/screens/SettingScreen';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyBi-125mLhxyiPqVYucnufenZ1gbeAuzjQ',
      authDomain: 'one-time-password-cf3cc.firebaseapp.com',
      databaseURL: 'https://one-time-password-cf3cc.firebaseio.com',
      projectId: 'one-time-password-cf3cc',
      storageBucket: 'one-time-password-cf3cc.appspot.com',
      messagingSenderId: '344468271785'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          stock: { 
            screen: StackNavigator({
              stock_list: {
                screen: StockScreen
              },
              stock_detail: {
                screen: StockDetailScreen,
                navigationOptions: { 
                  tabBarVisible: false 
                }
              }
            }, {
              navigationOptions: {
                header: null
              }
            }) 
          },
          setting: { screen: SettingScreen }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
