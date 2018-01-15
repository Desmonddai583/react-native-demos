import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListView, 
  Platform,
  View, 
  TouchableOpacity, 
  AsyncStorage, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { Icon, ListItem, Header } from 'react-native-elements';
import UserSocket from '../services/websocket/UserSocket.js';

class SettingScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => <Icon name="trending-up" size={30} color={tintColor} />,
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
      dataSource: ds.cloneWithRows(stocks),
      isLoading: true,
      socket: null
    };
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('anonymous_token');

    if (token) {
      const { channel, socket } = new UserSocket('room:lobby');
      this.setState({
        socket
      });
    
      channel.join()
        .receive('ok', () => {
          channel.push('new-request', { type: 'bind-to-user', token });
        })
        .receive('error', () => { 
          Alert.alert(
            '',
            'Fail to connect to server!',
            [
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        });

      channel.on('response', payload => {
        const str = JSON.stringify(payload, null, 2);
        console.log(`Response: ${str}`);
        this.setState({ isLoading: false });
      });
    } else {
      Alert.alert(
        '',
        'Your account has not yet been logined',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      );
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
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
      <View>
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

export default connect(null)(SettingScreen);

