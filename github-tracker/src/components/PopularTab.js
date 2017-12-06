import React, { Component } from 'react';
import { 
  View,
  ListView,
  RefreshControl
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

  loadData() {
    this.setState({
      isLoading: true
    });
    const url = this.genURL(this.props.tabLabel);
    this.dataRepository
      .fetchNetRepository(url)
      .then(result => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(result.items)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  genURL(key) {
    return URL + key + QUERY_STR;
  }

  renderRow(rowData) {
    return (
      <RepositoryCell data={rowData} />
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
