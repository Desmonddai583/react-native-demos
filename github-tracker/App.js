import React from 'react';
import { 
  Navigator,
  View,
  StyleSheet
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import WelcomePage from './src/pages/WelcomePage';
import HomePage from './src/pages/HomePage';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomePage },
      main: {
        screen: TabNavigator({
          home: { screen: HomePage }
        }, {
          navigationOptions: {
            tabBarVisible: false
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
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});