import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to StockApp', color: '#03A9F4' },
  { text: 'Use this to run back test', color: '#009688' },
  { text: 'Add your alert, then get notification', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  async componentWillMount() {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('auth');
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.props.loggedIn)) {
      return <AppLoading />;
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

function mapStateToProps({ auth }) {
  return { loggedIn: auth.loggedIn };
}

export default connect(mapStateToProps)(WelcomeScreen);
