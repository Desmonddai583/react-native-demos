import React from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WelcomePage from './src/pages/WelcomePage';
import PopularPage from './src/pages/PopularPage';
import TrendingPage from './src/pages/TrendingPage';
import FavoritePage from './src/pages/FavoritePage';
import MyPage from './src/pages/MyPage';
import RepositoryDetailPage from './src/pages/PopularPage/RepositoryDetailPage';
import CustomKeyPage from './src/pages/MyPage/CustomKeyPage';
import SortKeyPage from './src/pages/MyPage/SortKeyPage';
import AboutPage from './src/pages/MyPage/AboutPage';
import WebsitePage from './src/pages/MyPage/WebsitePage';

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
                screen: RepositoryDetailPage,
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
          trend: { 
            screen: StackNavigator({
              trend_main: {
                screen: TrendingPage
              },
              trend_detail: {
                screen: RepositoryDetailPage,
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
          favorite: {
            screen: StackNavigator({
              favorite_main: {
                screen: FavoritePage
              },
              favorite_detail: {
                screen: RepositoryDetailPage,
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
              },
              my_about_main: {
                screen: AboutPage,
                navigationOptions: { 
                  tabBarVisible: false 
                }
              },
              my_about_website: {
                screen: WebsitePage,
                navigationOptions: { 
                  tabBarVisible: false 
                }
              },
              my_about_repo_detail: {
                screen: RepositoryDetailPage,
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
        }, {
          lazy: true
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
