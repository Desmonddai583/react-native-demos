import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Image,
  Text,
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import NavigationBar from '../components/NavigationBar';
import TrendingTab from '../components/TrendingTab';
import Popover from '../components/Popover';
import LanguageService, { FLAG_LANGUAGE } from '../service/LanguageService';
import TimeSpan from '../model/TimeSpan';

const timeSpanTextArr = [
  new TimeSpan('今 天', 'since=daily'),
  new TimeSpan('本 周', 'since=weekly'),
  new TimeSpan('本 月', 'since=monthly')
];

class TrendingPage extends Component {
  static navigationOptions = () => ({
    title: '趋势',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_trending.png')} 
      />
    )
  });

  constructor(props) {
    super(props);
  
    this.languageService = new LanguageService(FLAG_LANGUAGE.flag_language);
    this.state = {
      languages: [],
      isVisible: false,
      buttonRect: {},
      timeSpan: timeSpanTextArr[0]
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

  onSelectTimeSpan(timeSpan) {
    this.setState({
      timeSpan,
      isVisible: false
    });
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

  showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: { x: px, y: py, width, height }
      });
    });
  }

  closePopover() {
    this.setState({
      isVisible: false,
    });
  }

  renderTitleView() {
    return (
      <View>
        <TouchableOpacity
          ref='button'
          onPress={() => this.showPopover()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '400' }}>
              趋势 {this.state.timeSpan.showText}
            </Text>
            <Image 
              style={{ width: 12, height: 12, marginLeft: 5 }}
              source={require('../../res/images/ic_spinner_triangle.png')}
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
          return lan.checked ? 
            <TrendingTab 
              key={i} 
              timeSpan={this.state.timeSpan} 
              tabLabel={lan.name} 
              {...this.props} 
            /> : null;
        })}
      </ScrollableTabView>
    ) : null;
    const timeSpanView = (
      <Popover
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        placement='bottom'
        onClose={() => this.closePopover()}
        contentStyle={{ backgroundColor: '#343434', opacity: 0.82 }}
        style={{ backgroundColor: 'red' }}
      >
        {timeSpanTextArr.map((result, i, arr) => (
            <TouchableOpacity 
              key={i}
              underlayColor='transparent'
              onPress={() => this.onSelectTimeSpan(arr[i])}
            >
              <Text
                style={{ fontSize: 18, color: 'white', padding: 8, fontWeight: '400' }}
              >
                {arr[i].showText}
              </Text>
            </TouchableOpacity>
          )
        )}
      </Popover>
    );
    return (
      <View style={styles.container}>
        <NavigationBar 
          titleView={this.renderTitleView()}
          statusBar={{ backgroundColor: '#2196F3' }}
        />
        {content}
        <Toast ref="toast" />
        {timeSpanView}
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

export default TrendingPage;
