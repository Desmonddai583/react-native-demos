import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import { FLAG_LANGUAGE } from '../service/LanguageService';

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
          style={{ backgroundColor: '#2196F3' }}
        />
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_custom_key', { 
              ...this.props,
              flag: FLAG_LANGUAGE.flag_key
            })
          }
        >自定义标签</Text>
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_custom_key', { 
              ...this.props,
              flag: FLAG_LANGUAGE.flag_language
            })
          }
        >自定义语言</Text>
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_sort_key', { 
              ...this.props,
              flag: FLAG_LANGUAGE.flag_key
            })
          }
        >标签排序</Text>
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_sort_key', { 
              ...this.props,
              flag: FLAG_LANGUAGE.flag_language
            })
          }
        >语言排序</Text>
        <Text 
          style={styles.tips}
          onPress={() =>
            this.props.navigation.navigate('my_custom_key', { 
              ...this.props,
              isRemoveKey: true,
              flag: FLAG_LANGUAGE.flag_key
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
