import React, { Component } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import StockChart from '../../components/StockChart.js';

class StockDetailScreen extends Component {
  renderLeftComponent = () => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.goBack();
      }}
    >
      <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 16 }}>
        <Icon
          name="arrow-back" 
          size={30} 
          color='#fff'
        />
      </View>
    </TouchableOpacity>  
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={this.renderLeftComponent()}
          centerComponent={{ 
            text: 'Stock',
            style: { fontWeight: '600', fontSize: 20, color: '#fff' } 
          }}
        />
        <StockChart style={{ flex: 1 }} />
      </View>
    );
  }
}

export default StockDetailScreen;
