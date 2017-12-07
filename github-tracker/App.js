import React from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WelcomePage from './src/pages/WelcomePage';
import PopularPage from './src/pages/PopularPage';
import MyPage from './src/pages/MyPage';
import CustomKeyPage from './src/pages/MyPage/CustomKeyPage';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomePage },
      main: {
        screen: TabNavigator({
          popular: { 
            screen: PopularPage 
          },
          my: {
            screen: StackNavigator({
              my_setting: {
                screen: MyPage
              },
              my_custom_key: {
                screen: CustomKeyPage
              }
            }, {
              navigationOptions: {
                header: null,
                animationEnabled: true
              }
            })
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
