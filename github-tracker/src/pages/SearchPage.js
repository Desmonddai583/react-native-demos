import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import ViewUtils from '../utils/ViewUtils';
import GlobalStyles from '../../res/styles/GlobalStyles';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  onBackPress() {
    
  }

  renderNavBar() {
    const backButton = ViewUtils.getLeftButton(() => this.onBackPress());
    const inputView = (
      <TextInput
        style={styles.textInput}
      >

      </TextInput>
    );
    const rightButton = (
      <TouchableOpacity
      >

      </TouchableOpacity>
    );

    return (
      <View
        style={{
          backgroundColor: '#2196F3',
          flexDirection: 'row',
          alignItems: 'center',
          height: (Platform.OS === 'ios') ? 
            GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}
      >
        {backButton}
        {inputView}
      </View>
    );
  }

  render() {
    let statusBar = null;
    if (Platform.OS === 'ios') {
      statusBar = <View style={[styles.statusBar, { backgroundColor: '#2196F3' }]} />;
    }

    return (
      <View style={GlobalStyles.root_container}>
        {statusBar}
        {this.renderNavBar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20
  },
  textInput: {
    flex: 1,
    height: (Platform.OS === 'ios') ? 30 : 30,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white'
  }
});

export default SearchPage;
