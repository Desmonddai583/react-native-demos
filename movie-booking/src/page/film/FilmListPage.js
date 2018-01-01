import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import FilmList from '../../component/FilmList';
import ToolbarHome from '../../component/ToolbarHome';

export default class FilmListPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ToolbarHome />
        <FilmList {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

