import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

import ToolbarHome from '../../component/ToolbarHome';

export default class cinemaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onPress(id, name) {
    this.props.navigation.navigate('cinema_info', {
      id,
      name
    });
  }

  fetchData() {
     const url = 'https://m.maoyan.com/cinemas.json';
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(responseData.data),
          });
        });
  }

  renderCinema = (rowData) => (
    <TouchableOpacity 
      style={styles.cinemaRow} 
      onPress={() => { this.onPress(rowData.id, rowData.nm); }}
    >
      <View style={styles.nameView}>
        <Text style={styles.nameText}>{rowData.nm}</Text>
        <View style={styles.sateView}>
          <Text style={styles.sateText}>座</Text>
        </View>
      </View>
      <Text style={styles.addrText}>{rowData.addr}</Text>
    </TouchableOpacity>
  );

  renderHeader(sectionData, sectionId) {
    return (
      <View style={styles.regionView}>
        <Text style={styles.regionText}>{sectionId}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>  
        <ToolbarHome />       
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCinema}
          renderSectionHeader={this.renderHeader}
          style={styles.listView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  listView: {
    flex: 1,
  },
  regionView: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  regionText: {
    fontSize: 16,        
  },
  cinemaRow: {
    borderColor: '#ddd',
    borderTopWidth: 1, 
    padding: 15,
  },
  nameView: {
    flexDirection: 'row',   
  },
  nameText: {
    fontSize: 17,         
  },
  addrText: {
    color: '#999',
    marginTop: 10,
  },
  sateView: {
    backgroundColor: '#d92d2d',
    borderRadius: 2, 
    width: 16,   
    alignSelf: 'center'            
  },
  sateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  }
});
