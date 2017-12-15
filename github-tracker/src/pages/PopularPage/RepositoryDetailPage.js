import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  WebView
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';

class RepositoryDetailPage extends Component {
  constructor(props) {
    super(props);
  
    const item = this.props.navigation.state.params.item;
    this.url = item.html_url;
    const title = item.full_name;
    this.state = {
      url: this.url,
      title,
      canGoBack: false
    };
  }

  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url
    });
  }

  onBack() {
    if (this.state.canGoBack) {
      this.refs.webview.goBack();
    } else {
      this.props.navigation.goBack();
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
          title={this.state.title}
          style={{ backgroundColor: '#6495ED' }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
        />
        <WebView 
          ref="webview"
          source={{ uri: this.state.url }}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          startInLoadingState
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RepositoryDetailPage;
