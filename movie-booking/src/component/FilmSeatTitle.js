import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

class FilmSeat extends Component {
  constructor(props) {
   super(props);
   this.state = {
   };
  }

  render() {
    const { location } = this.props;
    const movieMsg = location.state;
    const movieType = (() => {
      if (movieMsg.dimensional === 0) return (<Text>2D</Text>);
      if (movieMsg.dimensional === 1) return (<Text>3D</Text>);
      if (movieMsg.dimensional === 2) return (<Text>4D</Text>);
    })();
    const data = new Date(movieMsg.time);
    let week = data.getDay() + 1;
    let month = data.getMonth() + 1;
    let dayCn = '';
    switch (week) {
      case 1:
        dayCn = '周一';
        break;
      case 2:
        dayCn = '周二';
        break;
      case 3:
        dayCn = '周三';
        break;
      case 4:
        dayCn = '周四';
        break;
      case 5:
        dayCn = '周五';
        break;
      case 6:
        dayCn = '周六';
        break;
      case 7:
        dayCn = '周日';
        break;
      default:
       return false;
    }
    if (week < 10) week = `0${week}`;
    if (month < 10) month = `0${month}`;
    return (
      <View>
        <View style={styles.movieMsgFlex}>
          <View style={styles.movieTitleFlex}>
            <Text style={styles.movieTitle}>北京完美影城（望京店）</Text>
            <Text style={styles.movieDate}> <Text>{dayCn}{month}月{week}日</Text>
                <Text>{ movieMsg.startTime }</Text>
                <Text>{movieMsg.language}{movieType}</Text></Text>
          </View>
          <Text style={styles.movieMsgBtn}>换一场</Text>
        </View>
        <View style={styles.seatWrapperAll}>
          <View style={styles.seatWrapper}>
            <View style={styles.seatItem}>
              <Image style={styles.seatImg} source={require('../../res/images/seat_white.png')} />
              <Text style={styles.seatWord}>可选</Text>
            </View>
            <View style={styles.seatItem}>
              <Image style={styles.seatImg} source={require('../../res/images/seat_red.png')} />
              <Text style={styles.seatWord}>已售</Text>
            </View>
            <View style={styles.seatItem}>
              <Image style={styles.seatImg} source={require('../../res/images/seat_green.png')} />
              <Text style={styles.seatWord}>已选</Text>
            </View>
            <View style={styles.seatItem}>
              <Image style={styles.seatImg} source={require('../../res/images/seat_double.png')} />
              <Text style={styles.seatWord}>情侣座</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieMsgFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieTitleFlex: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  seatWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default FilmSeat;
