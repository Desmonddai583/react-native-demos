import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  }
];

class SettingScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => <Icon name="settings" size={30} color={tintColor} />,
  });

  render() {
    return (
      <View style={{ backgroundColor: '#EDF0F2', flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ 
            text: 'Settings',
            style: { fontWeight: '600', fontSize: 20, color: '#fff' } 
          }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
              />
            ))
          }
        </List>
      </View> 
    );
  }
}

export default connect(null)(SettingScreen);
