import React, { Component } from 'react';
import {
  Image
} from 'react-native';

import CinemaListPage from './cinema/CinemaListPage';

export default class CinemaPage extends Component {
  static navigationOptions = () => ({
    title: '影院',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/cinema.png')} 
      />
    )
  });

  render() {
    return (
      <CinemaListPage {...this.props} />
    );
  }
}

