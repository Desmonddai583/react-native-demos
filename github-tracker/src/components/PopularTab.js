import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import DataRepository, { FLAG_STORAGE } from '../service/DataRepository';
import FavoriteService from '../service/FavoriteService';
import RepositoryCell from '../components/RepositoryCell';
import ProjectModel from '../model/ProjectModel';
import ArrayUtils from '../utils/ArrayUtils';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const favoriteService = new FavoriteService(FLAG_STORAGE.flag_popular);

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      isLoading: false,
      favoriteKeys: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onSelect(projectModel) {
    this.props.navigation.navigate('popular_detail', {
      projectModel,
      ...this.props
    });
  }

  onFavorite(item, isFavorite) {
    if (isFavorite) {
      favoriteService.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
    } else {
      favoriteService.removeFavoriteItem(item.id.toString());
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

  loadData = () => {
    this.setState({
      isLoading: true
    });
    const url = this.genURL(this.props.tabLabel);
    this.dataRepository
      .fetchRepository(url)
      .then(result => {
        if (result && result.items) {
          this.items = result.items;
        } else {
          this.items = result || [];
        }
        this.getFavoriteKeys();
        if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
          DeviceEventEmitter.emit('showToast', '数据过时');
          return this.dataRepository.fetchNetRepository(url);
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

  genURL = (key) => {
    return URL + key + QUERY_STR;
  }

  renderRow = (projectModel) => (
    <RepositoryCell 
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
