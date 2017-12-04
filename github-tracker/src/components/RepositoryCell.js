import React, { Component } from 'react';
import { 
  View,
  Text
} from 'react-native';

class RepositoryCell extends Component {
  render() {
    return (
      <View style={{ margin: 10 }}>
        <Text>{this.props.data.full_name}</Text>
        <Text>{this.props.data.description}</Text>
        <Text>{this.props.data.owner.avatar_url}</Text>
        <Text>{this.props.data.stargazers_count}</Text>
      </View>
    );
  }
}

export default RepositoryCell;
