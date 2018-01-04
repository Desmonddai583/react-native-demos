import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

class FilmSeat extends Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');
    const numIndexWidth = (width - 30) * 0.1;
    const seatWrapperWidth = (width - 30) * 0.9;

    this.state = {
      numIndexWidth,
      seatWrapperWidth,
      isSoldUrl: 'seat_white'
    };
  }

  componentWillReceiveProps(nextProp) {
    const { filmSeatList, filmBuyList } = nextProp;
    const seatList = filmSeatList.seatArr;
    const isSoldUrl = [];
    if (seatList) {
      seatList.forEach((item, index) => {
        if (item.isSold) {
          isSoldUrl[index] = 'seat_red';
        } else {
          isSoldUrl[index] = 'seat_white';
        }
      });
      this.setState({
        isSoldUrl
      }, () => {
        if (filmBuyList.isSoldUrl.length) {
          this.setState({
            isSoldUrl: filmBuyList.isSoldUrl
          });
        }
      });
    }
  }

  getWrapperSize(seatList) {
    let maxX = 0;
    let maxY = 0;
    seatList.forEach((item) => {
      if (item.xAxis > maxX) {
        maxX = item.xAxis;
      }
      if (item.yAxis > maxY) {
        maxY = item.yAxis;
      }
    });
    return {
      maxX,
      maxY
    };
  }

  getSeatColNum(maxY, seatWidth, numIndexWidth) {
    const result = new Array(maxY).fill(0).map((_, index) => {
      const styleNumIndex = {
        width: numIndexWidth,
        height: seatWidth
      };
      return (
        <View>
          <Text 
            key={`numindex${index}`}
            style={styleNumIndex}
          >
            {index + 1}
          </Text>
        </View>
      );
    });
    return result;
  }

  render() {
    const { filmSeatList } = this.props;
    const { 
      numIndexWidth,
      seatWrapperWidth,
    } = this.state;
    const seatList = filmSeatList.seatArr;

    if (seatList) {
      const maxSize = this.getWrapperSize(seatList);
      const seatWidth = seatWrapperWidth / maxSize.maxX;
      // const seatWrapperHeight = seatWidth * maxSize.maxY;
      const list = seatList.map((item, index) => {
        const style = {
          left: ((seatWidth * (item.xAxis - 1)) + (seatWidth / 2)) - 0.01,
          top: seatWidth * (item.yAxis - 1),
          width: seatWidth,
          height: seatWidth,
          position: 'absolute'
        };
        return (
          <Image
            key={`seatId${index}`}
            style={[style, styles.seatItem]}
            source={require('../../res/images/seat_white.png')}
          />
        );
      });
      const listNum = this.getSeatColNum(maxSize.maxY, seatWidth, numIndexWidth);
      return (
        <View 
          style={{ 
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginTop: 20
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ top: 100 }}>
              {listNum}
            </View>
          </View>
          <View style={{ flex: 9 }}>
            <View style={{ alignItems: 'center', height: 100 }}>
              <Text>{filmSeatList.roomName}</Text>
              <Text>银幕中央</Text>
            </View>
            <View style={{ top: 100 }}>
              {list}
            </View>
          </View>
        </View>
      );
    }
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({

});

export default FilmSeat;
