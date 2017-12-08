import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Image
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import NavigationBar from '../components/NavigationBar';
import PopularTab from '../components/PopularTab';
import LanguageService, { FLAG_LANGUAGE } from '../service/LanguageService';

class PopularPage extends Component {
  static navigationOptions = () => ({
    title: '最热',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_popular.png')} 
      />
    )
  });

  constructor(props) {
    super(props);
  
    this.languageService = new LanguageService(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageService.fetch()
      .then(result => {
        this.setState({
          languages: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const content = this.state.languages.length > 0 ? (
      <ScrollableTabView
        tabBarBackgroundColor="#2196F3"
        tabBarInactiveTextColor="mintcream"
        tabBarActiveTextColor="white"
        tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {this.state.languages.map((result, i, arr) => {
          const lan = arr[i];
          return lan.checked ? <PopularTab key={i} tabLabel={lan.name} /> : null;
        })}
      </ScrollableTabView>
    ) : null;
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

export default PopularPage;
