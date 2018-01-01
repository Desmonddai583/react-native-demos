import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import FilmPage from './src/page/FilmPage';
import CinemaPage from './src/page/CinemaPage';
import UserPage from './src/page/UserPage';
import FilmInfoPage from './src/page/film/FilmInfoPage';
import MoreCommentPage from './src/page/film/MoreCommentPage';
import CinemaInfoPage from './src/page/cinema/CinemaInfoPage';

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
