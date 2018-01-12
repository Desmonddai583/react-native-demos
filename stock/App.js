import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import StockScreen from './src/screens/StockScreen';
import StockDetailScreen from './src/screens/Stock/StockDetailScreen';
import SettingScreen from './src/screens/SettingScreen';

export default class App extends React.Component {
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
