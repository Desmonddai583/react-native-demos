import React from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WelcomePage from './src/pages/WelcomePage';
import PopularPage from './src/pages/PopularPage';
import MyPage from './src/pages/MyPage';
import RepositoryDetailPage from './src/pages/PopularPage/RepositoryDetailPage';
import CustomKeyPage from './src/pages/MyPage/CustomKeyPage';
import SortKeyPage from './src/pages/MyPage/SortKeyPage';

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      welcome: { screen: WelcomePage },
      main: {
        screen: TabNavigator({
          popular: { 
            screen: StackNavigator({
              popular_main: {
                screen: PopularPage
              },
              popular_detail: {
                screen: RepositoryDetailPage
              }
            }, {
              navigationOptions: {
                header: null
              }
            })  
          },
          my: {
            screen: StackNavigator({
              my_setting: {
                screen: MyPage
              },
              my_custom_key: {
                screen: CustomKeyPage,
                navigationOptions: { 
                  tabBarVisible: false 
                }
              },
              my_sort_key: {
                screen: SortKeyPage,
                navigationOptions: { 
                  tabBarVisible: false 
                }
              }
            }, {
              navigationOptions: {
                header: null
              }
            })
          }
        })
      }
    }, {
      navigationOptions: {
        header: null
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
