import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ROUTE_NAME = 'auth';

class AuthScreen extends Component {
  constructor() {
    super();

    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    this.props.screenProps.navigationEvents.addListener(`onFocus:${ROUTE_NAME}`, this.onFocus);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onFocus() {
    this.props.anonymousLogin();
    this.onAuthComplete(this.props);
  }

  onAuthComplete(props) {
    if (props.loggedIn) {
      this.props.navigation.navigate('stock');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { loggedIn: auth.loggedIn };
}

export default connect(mapStateToProps, actions)(AuthScreen);
