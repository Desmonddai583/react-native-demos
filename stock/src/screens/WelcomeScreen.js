import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to StockApp', color: '#03A9F4' },
  { text: 'Use this to run back test', color: '#009688' },
  { text: 'Add your alert, then get notification', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { isOpened: null }

  async componentWillMount() {
    const isOpened = await AsyncStorage.getItem('isOpened');

    if (JSON.parse(isOpened)) {
      this.props.navigation.navigate('auth');
    } else {
      this.setState({ isOpened: false });
    }
  }

  onSlidesComplete = async () => {
    await AsyncStorage.setItem('isOpened', JSON.stringify(true));
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNil(this.state.isOpened)) {
      return <AppLoading />;
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
