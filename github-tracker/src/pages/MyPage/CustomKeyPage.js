import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import ViewUtils from '../../components/ViewUtils';

class CustomKeyPage extends Component {
  onSave() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='自定义标签'
          style={{ backgroundColor: '#6495ED' }}
          leftButton={ViewUtils.getLeftButton(() => this.onSave())}
        />
        <Text style={styles.tips}>123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29
  }
});

export default CustomKeyPage;

