import React, { Component } from 'react';
import { 
  View,
  ListView
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
      dataSource: ds
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const url = this.genURL(this.props.tabLabel);
    this.dataRepository
      .fetchNetRepository(url)
      .then(result => {
        this.setState({
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
      <View>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

export default PopularTab;
