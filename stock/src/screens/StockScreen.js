import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListView, 
  Platform,
  View, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Icon, ListItem, Header } from 'react-native-elements';
import UserSocket from '../services/websocket/UserSocket.js';
import * as actions from '../actions';

const ROUTE_NAME = 'stock';

class SettingScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => <Icon name="trending-up" size={30} color={tintColor} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.screenProps.navigationEvents.addListener(`onFocus:${ROUTE_NAME}`, this.onFocus);
  }

  onFocus = () => {
    const socket = UserSocket.getSocket();
    socket.channel.push('new-request', { type: 'list-alerts' });
    socket.channel.on('response', payload => {
      console.log(payload.alerts);
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
      this.setState({
        dataSource: ds.cloneWithRows(stocks),
        isLoading: false,
      });
    });
  }

  renderRow = (stock) => (
    <ListItem
      onPress={() =>
        this.props.navigation.navigate('stock_detail')
      }
      key={stock.name}
      roundAvatar
      title={stock.name}
      avatar={stock.image}
    />
  );

  renderRightComponent = () => (
    <View>
      <TouchableOpacity
        onPress={() => {
          
        }}
      >
        <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 16 }}>
          <Icon
            name="add" 
            size={30} 
            color='#fff'
          />
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    } 
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ 
            text: 'Stock',
            style: { fontWeight: '600', fontSize: 20, color: '#fff' } 
          }}
          rightComponent={this.renderRightComponent()}
        />
        <ListView 
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>   
    );
  }
}

export default connect(null, actions)(SettingScreen);

