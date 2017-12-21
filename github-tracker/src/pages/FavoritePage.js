import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Image,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import NavigationBar from '../components/NavigationBar';
import FavoriteTab from '../components/FavoriteTab';
import { FLAG_STORAGE } from '../service/DataRepository';

class FavoritePage extends Component {
  static navigationOptions = () => ({
    title: '收藏',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_favorite.png')} 
      />
    )
  });

  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  render() {
    const content = (
      <ScrollableTabView
        tabBarBackgroundColor="#2196F3"
        tabBarInactiveTextColor="mintcream"
        tabBarActiveTextColor="white"
        tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <FavoriteTab tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props} />
        <FavoriteTab tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props} />
      </ScrollableTabView>
    );
    return (
      <View style={styles.container}>
        <NavigationBar 
          title='最热'
          statusBar={{ backgroundColor: '#2196F3' }}
        />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 29
  }
});

export default FavoritePage;
