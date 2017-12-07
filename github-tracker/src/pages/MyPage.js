import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

class MyPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          style={{ backgroundColor: '#6495ED' }}
        />
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_custom_key', { 
              ...this.props
            })
          }
        >自定义标签</Text>
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

export default MyPage;
