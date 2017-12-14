import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  WebView,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';

const URL = 'http://www.imooc.com';

class RepositoryDetailPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      url: URL,
      title: '',
      canGoBack: false
    };
  }

  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      title: e.title
    });
  }

  goBack() {
    if (this.state.canGoBack) {
      this.ref.webview.goBack();
    } else {
      DeviceEventEmitter.emit('showToast', '到顶了');
    }
  }

  go() {
    this.setState({
      url: this.text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          style={{ backgroundColor: '#6495ED' }}
        />
        <View style={styles.row}>
          <Text 
            style={styles.tips}
            onPress={() => {
              this.goBack();
            }}
          />
          <TextInput 
            style={styles.input}
            defaultValue={URL}
            onChangeText={text => this.text = text}
          />
          <Text 
            style={styles.tips}
            onPress={() => {
              this.go();
            }}
          />
        </View>
        <WebView 
          ref="webview"
          source={{ uri: this.state.url }}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 2
  }
});

export default RepositoryDetailPage;
