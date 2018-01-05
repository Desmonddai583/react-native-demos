import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';

class FilmSeatSale extends Component {
  constructor(props) {
    super(props);
    const { width } = Dimensions.get('window');
    this.width = width;
    this.state = {
    };
  }

  deleteBuySeat(data) {
    const { changeSeatConf, filmBuyList, filmSeatList } = this.props;
    const isSoldUrl = filmBuyList.isSoldUrl.map((item) => item);
    let index = 0;
    filmSeatList.seatArr.forEach((item, i) => {
      if (item.seatId === data.seatId) {
        index = i;
      }
    });
    isSoldUrl[index] = 'seat_white';
    changeSeatConf(data, isSoldUrl, 'delete');
  }

  render() {
    const { filmBuyList, filmSeatList } = this.props;
    const price = filmSeatList.price;
    const length = filmBuyList.item.length;
    if (length) {
      const list = filmBuyList.item.map((item, index) => (
        <View key={`seatSalePosition${index}`} style={{ marginRight: 5 }}>
          <Image
            style={{
              resizeMode: 'stretch',
              width: (this.width - 35) / 4,
              height: 35
            }}
            source={require('../../res/images/seat_position_border.png')}
          />
          <View 
            style={{ 
              flexDirection: 'row',
              position: 'absolute', 
              left: 0, 
              alignItems: 'center', 
              justifyContent: 'center',
              width: (this.width - 35) / 4,
              height: 35
            }}
          >
            <Text style={{ color: 'red', fontWeight: '600', marginRight: 2 }}>
              {item.rowId}排{item.columnId}座
            </Text>
            <TouchableHighlight onPress={this.deleteBuySeat.bind(this, item)}>
              <Image
                style={{ width: 11, height: 11 }}
                source={require('../../res/images/seat_position_icon.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      ));
      return (
        <View style={{ height: 150, flexDirection: 'column', backgroundColor: 'white' }}>
          <View
            style={{ 
              flex: 1, 
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: 10, 
              borderBottomWidth: 0.5, 
              borderColor: '#ddd' 
            }}
          >
            {list}
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{ 
                flex: 6, 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingVertical: 15,
                paddingLeft: 10 
              }}
            >
              <Text 
                style={{ flex: 2, color: 'red', fontSize: 16, fontWeight: '600' }}
              >
                ￥{price * length}
              </Text>
              <Text style={{ flex: 1 }}>￥{price}×{length}</Text>
            </View>
            <View 
              style={{ 
                flex: 4, 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#fe4b37' 
              }}
            >
              <Text 
                style={{ 
                  color: 'white', 
                  fontSize: 16, 
                  fontWeight: '600'
                }}
              >
                确认选座
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ height: 150, flexDirection: 'column', backgroundColor: 'white' }}>
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center', 
            paddingLeft: 10, 
            borderBottomWidth: 0.5, 
            borderColor: '#ddd' 
          }}
        >
          <Text style={{ fontWeight: '400' }}>一次最多选择四个座位</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View 
            style={{ 
              flex: 6, 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingVertical: 15,
              paddingLeft: 10 
            }}
          >
            <Text style={{ flex: 2, color: 'red', fontSize: 16, fontWeight: '600' }}>￥0</Text>
            <Text style={{ flex: 1 }}>￥{price}×0</Text>
          </View>
          <View 
            style={{ 
              flex: 4, 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: 'gray' 
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>请先选座</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default FilmSeatSale;
