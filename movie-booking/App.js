import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import FilmPage from './src/page/FilmPage';
import CinemaPage from './src/page/CinemaPage';
import UserPage from './src/page/UserPage';
import FilmInfoPage from './src/page/film/FilmInfoPage';
import MoreCommentPage from './src/page/film/MoreCommentPage';
import CinemaInfoPage from './src/page/cinema/CinemaInfoPage';
import CinemaSalePage from './src/page/cinema/CinemaSalePage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  render() {        
    const MainNavigator = TabNavigator({
      film: { 
        screen: StackNavigator({
          film_main: {
            screen: FilmPage
          },
          film_info: {
            screen: FilmInfoPage,
            navigationOptions: { 
              tabBarVisible: false 
            }
          },
          more_comment: {
            screen: MoreCommentPage,
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
      cinema: { 
        screen: StackNavigator({
          cinema_main: {
            screen: CinemaPage
          },
          cinema_info: {
            screen: CinemaInfoPage,
            navigationOptions: { 
              tabBarVisible: false 
            }
          },
          cinema_sale: {
            screen: CinemaSalePage,
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
      user: {
        screen: UserPage
      }
    }, {
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
