import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Image,
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
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
    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.refs.toast.show(text, DURATION.LENGTH_LONG);
    });
    this.loadData();
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
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

  renderRightButton() {
    return (
      <View>
        <TouchableOpacity
          
          onPress={() => {
            this.props.navigation.navigate('popular_search', {
              ...this.props
            });
          }}
        >
          <View style={{ padding: 5, marginRight: 8 }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../../res/images/ic_search_white_48pt.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
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
          return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props} /> : null;
        })}
      </ScrollableTabView>
    ) : null;
    return (
      <View style={styles.container}>
        <NavigationBar 
          title='最热'
          statusBar={{ backgroundColor: '#2196F3' }}
          rightButton={this.renderRightButton()}
        />
        {content}
        <Toast ref="toast" />
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
