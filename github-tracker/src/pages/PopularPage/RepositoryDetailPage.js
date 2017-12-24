import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  WebView,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import FavoriteService from '../../service/FavoriteService';

const TRENDING_URL = 'https://github.com/';

class RepositoryDetailPage extends Component {
  constructor(props) {
    super(props);
  
    const item = this.props.navigation.state.params.projectModel.item;
    this.url = item.html_url ? item.html_url : TRENDING_URL + item.fullName;
    const title = item.full_name ? item.full_name : item.fullName;
    this.favoriteService = new FavoriteService(this.props.navigation.state.params.flag);
    this.state = {
      url: this.url,
      title,
      canGoBack: false,
      isFavorite: this.props.navigation.state.params.projectModel.isFavorite,
      favoriteIcon: this.props.navigation.state.params.projectModel.isFavorite ?
        require('../../../res/images/ic_star.png') :
        require('../../../res/images/ic_star_navbar.png')
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
      if (this.props.navigation.state.params.onUpdate) {
        this.props.navigation.state.params.onUpdate();
      }
    }
  }

  onRightButtonClick() {
    const projectModel = this.props.navigation.state.params.projectModel;
    this.setFavoriteState(projectModel.isFavorite = !projectModel.isFavorite);
    const key = projectModel.item.full_name ? 
      projectModel.item.id.toString() : projectModel.item.fullName;
    if (projectModel.isFavorite) {
      this.favoriteService.saveFavoriteItem(key, JSON.stringify(projectModel.item));
    } else {
      this.favoriteService.removeFavoriteItem(key);
    }
  }

  setFavoriteState(isFavorite) {
    this.setState({
      isFavorite,
      favoriteIcon: isFavorite ? 
        require('../../../res/images/ic_star.png') : 
        require('../../../res/images/ic_star_navbar.png')
    });
  }

  go() {
    this.setState({
      url: this.text
    });
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        onPress={() => this.onRightButtonClick()}
      >
        <Image 
          source={this.state.favoriteIcon}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.title}
          style={{ backgroundColor: '#2196F3' }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={this.renderRightButton()}
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
