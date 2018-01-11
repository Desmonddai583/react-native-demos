import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class SettingScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />,
  });

  render() {
    return (
      <View>
        <Button 
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

export default connect(null)(SettingScreen);
