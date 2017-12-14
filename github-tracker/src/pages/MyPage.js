import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

class MyPage extends Component {
  static navigationOptions = () => ({
    title: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_my.png')} 
      />
    )
  });
  
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
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_sort_key', { 
              ...this.props
            })
          }
        >标签排序</Text>
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_custom_key', { 
              ...this.props,
              isRemoveKey: true
            })
          }
        >标签移除</Text>
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
