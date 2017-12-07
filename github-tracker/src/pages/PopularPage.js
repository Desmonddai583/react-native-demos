import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Image
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import NavigationBar from '../components/NavigationBar';
import PopularTab from '../components/PopularTab';

class PopularPage extends Component {
  static navigationOptions = () => ({
    title: '最热',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor: tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_popular.png')} 
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          title='最热'
          statusBar={{ backgroundColor: '#2196F3' }}
        />
        <ScrollableTabView
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <PopularTab tabLabel="Jave">JAVA</PopularTab>
          <PopularTab tabLabel="IOS">IOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
        </ScrollableTabView>
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

export default PopularPage;
