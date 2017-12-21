import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl
} from 'react-native';
import DataRepository, { FLAG_STORAGE } from '../service/DataRepository';
import FavoriteService from '../service/FavoriteService';
import RepositoryCell from '../components/RepositoryCell';
import TrendingCell from '../components/TrendingCell';
import ProjectModel from '../model/ProjectModel';

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    this.favoriteService = new FavoriteService(this.props.flag);
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

  getDataSource = (data) => this.state.dataSource.cloneWithRows(data);

  updateState = (dict) => {
    if (!this) return;
    this.setState(dict);
  }

  loadData = () => {
    this.setState({
      isLoading: true
    });
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
        key={
          this.props.flag === FLAG_STORAGE.flag_popular ?
            projectModel.item.id : projectModel.item.fullName
        }
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
          enableEmptySections
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

export default FavoriteTab;
