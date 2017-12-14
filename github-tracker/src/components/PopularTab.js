import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import DataRepository from '../service/DataRepository';
import RepositoryCell from '../components/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onSelect(item) {
    this.props.navigation.navigate('popular_detail', {
      item,
      ...this.props
    });
  }

  loadData() {
    this.setState({
      isLoading: true
    });
    const url = this.genURL(this.props.tabLabel);
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

  genURL(key) {
    return URL + key + QUERY_STR;
  }

  renderRow = (rowData) => {
    return (
      <RepositoryCell 
        data={rowData}
        onSelect={(item) => this.onSelect(item)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData()}
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

export default PopularTab;
