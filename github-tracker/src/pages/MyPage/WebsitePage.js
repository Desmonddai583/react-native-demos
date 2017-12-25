import React, { Component } from 'react';
import {
    WebView,
    View,
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ViewUtils from '../../utils/ViewUtils';

class WebsitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: this.props.navigation.state.params.url,
          canGoBack: false,
          title: this.props.navigation.state.params.title,
        };
    }

    onBackPress() {
      if (this.state.canGoBack) {
        this.refs.webview.goBack();
      } else {
        this.props.navigation.goBack();
      }
    }

    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack,
        url: navState.url,
      });
    }

    render() {
      return (
        <View style={GlobalStyles.root_container}>
          <NavigationBar
            style={{ backgroundColor: '#2196F3' }}
            leftButton={ViewUtils.getLeftButton(() => this.onBackPress())}
            title={this.state.title}
          />
          <WebView
            ref='webview'
            startInLoadingState
            onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
            source={{ uri: this.state.url }}
          />
        </View>
      );
    }
}

export default WebsitePage;
