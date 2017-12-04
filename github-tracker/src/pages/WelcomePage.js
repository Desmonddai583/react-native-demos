import React, { Component } from 'react';
import { 
  View,
  Text
 } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('home');
    }, 2000);
  }

  componentWillUnmount() {
    this.time && clearTimeout(this.timer);
  }

  render() {
    return <View>
      <NavigationBar 
        title={'欢迎'}
      />
      <Text>欢迎</Text>
    </View>
  }
};