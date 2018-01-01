import React, { Component } from 'react';
import {
  Image,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

// import { ToolbarHome } from './Toolbar';

export default class UserPage extends Component {
  static navigationOptions = () => ({
    title: '我',
    tabBarIcon: ({ tintColor }) => (
      <Image 
      style={{ tintColor, height: 22, width: 22 }} 
      source={require('../../res/images/me.png')} 
      />
    )
  });

  sale() {
    Alert.alert('提示', '没有API,暂无登录功能！');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="用户名"
          />
          <TextInput
            style={styles.input1}
            placeholder="密码"
            secureTextEntry
          />

          <TouchableOpacity style={styles.btn} onPress={() => this.sale()}>
            <Text style={styles.btnText}>登录</Text>
          </TouchableOpacity>

          <View style={styles.options}>
            <Text style={styles.unlogin}>无法登录?</Text>
            <Text style={styles.newUser}>新用户</Text>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#eee',
    flex: 1,
    marginTop: 30,        
  },
  input: {
    height: 40,
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 2,
    textAlign: 'center'
  },
  input1: {
    height: 40,
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 1,
    textAlign: 'center'
  },
  btn: {
    backgroundColor: '#df2d2d',
    height: 40,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,      
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30
  },
  unlogin: {
    color: '#63B8FF',
    marginLeft: 10
  },
  newUser: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    textAlign: 'right',
    marginRight: 10,
    color: '#63B8FF'
  }
});
