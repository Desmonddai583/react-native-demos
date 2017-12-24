import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import { FLAG_STORAGE } from '../service/DataRepository';
import FavoriteService from '../service/FavoriteService';
import RepositoryCell from '../components/RepositoryCell';
import TrendingCell from '../components/TrendingCell';
import ProjectModel from '../model/ProjectModel';
import ArrayUtils from '../utils/ArrayUtils';

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    this.favoriteService = new FavoriteService(this.props.flag);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.unFavoriteItems = [];
    this.state = {
      dataSource: ds,
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onUpdate = () => {
    this.loadData(true);
  }

  onSelect(projectModel) {
    this.props.navigation.navigate('favorite_detail', {
      projectModel,
      flag: this.props.flag,
      onUpdate: this.onUpdate,
      ...this.props
    });
  }

  onFavorite(item, isFavorite) {
    const key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() : item.fullName;
    if (isFavorite) {
      this.favoriteService.saveFavoriteItem(key, JSON.stringify(item), this.notifyTabs);
    } else {
      this.favoriteService.removeFavoriteItem(key, this.notifyTabs);
    }
  }

  getDataSource = (data) => this.state.dataSource.cloneWithRows(data);

  notifyTabs = (key) => {
    ArrayUtils.updateArray(this.unFavoriteItems, key);
    if (this.unFavoriteItems.length > 0) {
      if (this.props.flag === FLAG_STORAGE.flag_popular) {
        DeviceEventEmitter.emit('favoriteChanged_popular');
      } else {
        DeviceEventEmitter.emit('favoriteChanged_trending');
      }
    }
  }

  updateState = (dict) => {
    if (!this) return;
    this.setState(dict);
  }

  loadData = (hideLoading) => {
    if (!hideLoading) {
      this.setState({
        isLoading: true
      });
    }
    this.favoriteService.getAllItems()
      .then(items => {
        const resultData = [];
        for (let i = 0, len = items.length; i < len; i++) {
          resultData.push(new ProjectModel(items[i], true));
        }
        this.updateState({
          isLoading: false,
          dataSource: this.getDataSource(resultData)
        });
      })
      .catch(() => {
        this.updateState({
          isLoading: false
        });
      });
  }

  renderRow = projectModel => {
    const CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ?
      RepositoryCell : TrendingCell;
    return (
      <CellComponent
        projectModel={projectModel}
        onSelect={() => this.onSelect(projectModel)}
        onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
          enableEmptySections
          refreshControl={
            <RefreshControl 
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData()}
              colors={['#2196F3']}
              tintColor={'#2196F3'}
              title='Loading...'
              titleColor={'#2196F3'}
            />
          }
        />
      </View>
    );
  }
}

export default FavoriteTab;
