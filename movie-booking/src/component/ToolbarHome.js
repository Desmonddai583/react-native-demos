import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform
} from 'react-native';

export default class ToolbarHome extends Component {
  render() {
    return (
      <View style={Platform.OS === 'ios' ? styles.toolbarIos : styles.toolbar}>                
        <Image source={require('../../res/images/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
      height: 40,
      backgroundColor: '#e54847',
      alignItems: 'center',
      flexDirection: 'row',
  },
  toolbarIos: {
      height: 40,
      backgroundColor: '#e54847',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 30
  },
  logo: {
      width: 30,
      height: 30,
      marginLeft: 10
  }
});
