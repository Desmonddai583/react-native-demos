import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventEmitter from 'EventEmitter';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './src/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import StockScreen from './src/screens/StockScreen';
import StockDetailScreen from './src/screens/Stock/StockDetailScreen';
import SettingScreen from './src/screens/SettingScreen';

const { store, persistor } = configureStore();

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBi-125mLhxyiPqVYucnufenZ1gbeAuzjQ',
      authDomain: 'one-time-password-cf3cc.firebaseapp.com',
      databaseURL: 'https://one-time-password-cf3cc.firebaseio.com',
      projectId: 'one-time-password-cf3cc',
      storageBucket: 'one-time-password-cf3cc.appspot.com',
      messagingSenderId: '344468271785'
    };

    firebase.initializeApp(config);
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
      }
    });

    const navigationEvents = new EventEmitter();

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator
              screenProps={{ navigationEvents }}
              onNavigationStateChange={(prevState, newState, action) => {
                if (action.type === 'Navigation/NAVIGATE') {
                  navigationEvents.emit(`onFocus:${action.routeName}`);
                }
              }}
            />
          </View>
        </PersistGate>
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
