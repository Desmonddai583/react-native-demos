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

  getSeatColNum(seatList, seatWidth, numIndexWidth) {
    let numIndex = 0;
    const numArr = [];
    seatList.forEach((item) => {
      if (item.yAxis === numIndex + 1) {
        numArr[numIndex] = item;
      } else {
        numIndex++;
      }
    });
    const result = numArr.map((item, index) => {
      const top = ((seatWidth) * (item.yAxis - 1));
      const styleNumIndex = {
        top,
        width: numIndexWidth
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
          height: seatWidth
        };
        return (
          <Image
            key={`seatId${index}`}
            style={[style, styles.seatItem]}
            source={require('../../res/images/seat_white.png')}
          />
        );
      });
      const listNum = this.getSeatColNum(seatList, seatWidth, numIndexWidth);
      return (
        <View 
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <View>{listNum}</View>
          <View>{list}</View>
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
