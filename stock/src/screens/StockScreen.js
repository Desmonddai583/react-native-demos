import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Platform } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

class SettingScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />,
  });

  constructor(props) {
    super(props);
  
    const stocks = [
      {
        name: 'bitcoin',
        image: require('../../res/images/bitcoin.png')
      },
      {
        name: 'ethereum',
        image: require('../../res/images/bitcoin.png')
      },
      {
        name: 'eos',
        image: require('../../res/images/bitcoin.png')
      }
    ];
    
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(stocks)
    };
  }

  renderRow(stock) {
    return (
      <ListItem
        key={stock.name}
        roundAvatar
        title={stock.name}
        avatar={stock.img}
      />
    );
  }

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default connect(null)(SettingScreen);

