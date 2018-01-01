import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';

export default class Toolbar extends Component {
  back = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={Platform.OS === 'ios' ? styles.toolbarIos : styles.toolbar}>
        <TouchableOpacity style={styles.backView} onPress={this.back}>
          <View style={styles.backIcon} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.name}</Text>
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
  backIcon: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    height: 12,
    width: 12,
    borderColor: '#fff',
    marginLeft: 20,
    transform: [{ rotate: '-45deg' }]
  },
  title: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
  },
  backText: {
    color: '#fff'
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
