import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import FavoriteService from '../service/FavoriteService';
import ProjectModel from '../model/ProjectModel';
import ArrayUtils from '../utils/ArrayUtils';
import DataRepository, { FLAG_STORAGE } from '../service/DataRepository';
import TrendingCell from '../components/TrendingCell';

const API_URL = 'https://github.com/trending/';
const favoriteService = new FavoriteService(FLAG_STORAGE.flag_trending);
const dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);

class TrendingTab extends Component {
  constructor(props) {
    super(props); 
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      isLoading: false,
      favoriteKeys: [],
    };
  }

  componentDidMount() {
    this.loadData(this.props.timeSpan, true);
    this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', () => {
      this.loadData(this.props.timeSpan, true);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeSpan !== this.props.timeSpan) {
      this.loadData(nextProps.timeSpan);
    } 
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
  }

  onRefresh() {
    this.loadData(this.props.timeSpan);
  }

  onUpdate = () => {
    this.loadData(this.props.timeSpan, true);
  }

  onSelect(projectModel) {
    this.props.navigation.navigate('trend_detail', {
      projectModel,
      flag: FLAG_STORAGE.flag_trending,
      onUpdate: this.onUpdate,
      ...this.props
    });
  }

  onFavorite(item, isFavorite) {
    if (isFavorite) {
      favoriteService.saveFavoriteItem(item.fullName, JSON.stringify(item), this.notifyTab);
    } else {
      favoriteService.removeFavoriteItem(item.fullName, this.notifyTab);
    }
  }

  getDataSource = (data) => this.state.dataSource.cloneWithRows(data);

  getFavoriteKeys = () => {
    favoriteService.getFavoriteKeys()
      .then(keys => {
        if (keys) {
          this.updateState({
            favoriteKeys: keys
          });  
        }
        this.flushFavoriteState();
      })
      .catch(() => {
        this.flushFavoriteState();
      });
  }

  notifyTab = () => {
    this.loadData(this.props.timeSpan, true);
  }

  flushFavoriteState = () => {
    const projectModels = [];
    const items = this.items;
    for (let i = 0, len = items.length; i < len; i++) {
      projectModels.push(
        new ProjectModel(items[i], ArrayUtils.checkExist(items[i], this.state.favoriteKeys))
      );
    }
    this.updateState({
      isLoading: false,
      dataSource: this.getDataSource(projectModels)
    });
  }

  updateState = (dict) => {
    if (!this) return;
    this.setState(dict);
  }

  loadData = (timeSpan, hideLoading) => {
    if (!hideLoading) {
      this.setState({
        isLoading: true
      });
    }
    const url = this.genURL(timeSpan, this.props.tabLabel);
    dataRepository
      .fetchRepository(url)
      .then(result => {
        if (result && result.items) {
          this.items = result.items;
        } else {
          this.items = result || [];
        }
        this.getFavoriteKeys();
        if (result && result.update_date && !dataRepository.checkDate(result.update_date)) {
          DeviceEventEmitter.emit('showToast', '数据过时');
          return dataRepository.fetchNetRepository(url);
        }
        DeviceEventEmitter.emit('showToast', '显示缓存数据');
      })
      .then(items => {
        if (!items || items.length === 0) return;
        this.items = items;
        this.getFavoriteKeys();
        DeviceEventEmitter.emit('showToast', '显示网络数据');
      })
      .catch(error => {
        console.log(error);
        this.updateState({
          isLoading: false
        });
      });
  }

  genURL(timeSpan, category) {
    return `${API_URL}${category}?${timeSpan.searchText}`;
  }

  renderRow = projectModel => (
    <TrendingCell 
      projectModel={projectModel}
      onSelect={() => this.onSelect(projectModel)}
      onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView 
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
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
