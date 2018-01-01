import React, { Component } from 'react';
import {
  Image
} from 'react-native';

import FilmListPage from './film/FilmListPage';

export default class FilmPage extends Component {
  static navigationOptions = () => ({
    title: '影片',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/film.png')} 
      />
    )
  });

  render() {
    return (
      <FilmListPage {...this.props} />
    );
  }
}
