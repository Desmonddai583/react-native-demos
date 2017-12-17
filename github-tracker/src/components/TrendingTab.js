import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import DataRepository, { FLAG_STORAGE } from '../service/DataRepository';
import TrendingCell from '../components/TrendingCell';

const API_URL = 'https://github.com/trending/';

class TrendingTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadData(this.props.timeSpan, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeSpan !== this.props.timeSpan) {
      this.loadData(nextProps.timeSpan);
    } 
  }

  onRefresh() {
    this.loadData(this.props.timeSpan);
  }

  onSelect(item) {
    this.props.navigation.navigate('trend_detail', {
      item,
      ...this.props
    });
  }

  loadData(timeSpan) {
    this.setState({
      isLoading: true
    });
    const url = this.genURL(timeSpan, this.props.tabLabel);
    this.dataRepository
      .fetchRepository(url)
      .then(result => {
        let items;
        if (result && result.items) {
          items = result.items;
        } else {
          items = result || [];
        }
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
        if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
          DeviceEventEmitter.emit('showToast', '数据过时');
          return this.dataRepository.fetchNetRepository(url);
        }
        DeviceEventEmitter.emit('showToast', '显示缓存数据');
      })
      .then(items => {
        if (!items || items.length === 0) return;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
        DeviceEventEmitter.emit('showToast', '显示网络数据');
      })
      .catch(error => {
        console.log(error);
      });
  }

  genURL(timeSpan, category) {
    return `${API_URL}${category}?${timeSpan.searchText}`;
  }

  renderRow = rowData => (
    <TrendingCell 
      data={rowData}
      onSelect={() => this.onSelect(rowData)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.isLoading}
              onRefresh={() => this.onRefresh()}
              colors={['#2196F3']}
              tintColor={'#2196F3'}
              title={'Loading...'}
              titleColor={'#2196F3'}
            />
          }
        />
      </View>
    );
  }
}

export default TrendingTab;
