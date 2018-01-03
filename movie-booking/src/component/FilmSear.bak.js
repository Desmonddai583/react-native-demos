import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from 'react-native';

class FilmSeat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      scaleNum: 1,
      scaleOld: 1,
      left: 0,
      top: 0,
      animationTime: 0,
      dis: 0,
      wrapperWidth: 5.25,
      wrapperSmallWidth: 1.8,
      isSoldUrl: 'seat_white',
      isSmallShow: 0
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

  onTouchStart(e) {
    const { left, top } = this.state;
    const { animationTime } = this.props;
    let state = {};
    if (e.touches.length === 1) {
      const startX = e.touches[0].clientX;
      const startY = e.touches[0].clientY;
      state = {
        startX,
        startY,
        lastDisX: left,
        lastDisY: top,
        isSmallShow: 1
      };
    } else {
      const dis = this.calDistance(e);
        state = {
          dis,
          isSmallShow: 1
        };
    }
    state.animationTimeSmall = animationTime;
    this.setState(state);
  }

  onTouchMove(e) {
    const { startX, startY, lastDisX, lastDisY, dis, scaleNum, scaleOld } = this.state;
      if (e.touches.length === 1) {
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        let disX = (moveX - startX) + lastDisX;
        let disY = (moveY - startY) + lastDisY;
        if (disX > 75 * scaleNum) disX = 75 * scaleNum;
        if (disX < -110 * scaleNum) disX = -110 * scaleNum;
        if (disY < -55 * scaleNum) disY = -55 * scaleNum;
        if (disY > 40 * scaleNum) disY = 40 * scaleNum;
        // scaleNum = 2
        this.setState({
          moveX,
          moveY,
          left: disX,
          top: disY,
        });
      } else if (e.touches.length === 2) {
        const moveDis = this.calDistance(e);
        let scaleNumResult = ((moveDis / dis) + scaleOld) - 1;
        if (scaleNumResult > 2) scaleNumResult = 2;
        if (scaleNumResult < 1) scaleNumResult = 1;
        this.setState({
          scaleNum: scaleNumResult,
        });
      }
  }

  onTouchEnd() {
    const { scaleNum } = this.state;
    const { animationTime } = this.props;
    if (scaleNum === 1) {
      setTimeout(() => {
        this.setState({
          animationTime,
          left: 0,
          top: 0,
          isSmallShow: 0
        }, () => {
          setTimeout(() => {
            this.setState({
              animationTime: 0
            });
          }, animationTime);
        });
      }, animationTime);
    }
    this.setState({
      scaleOld: scaleNum,
    });
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

  getSeatColNum(seatList, maxSize, seatWidth) {
    const { scaleNum } = this.state;
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
      const style = {
        top: `${top * scaleNum}rem`,
      };
      return (
        <Text 
          key={`numindex${index}`}
          style={[styles.numIndex, style]}
        >
          {index + 1}
        </Text>
      );
    });
    return result;
  }

  calDistance(e) {
    const touch0 = e.touches[0];
    const touch1 = e.touches[1];
    const touch0X = touch0.clientX;
    const touch0Y = touch0.clientY;
    const touch1X = touch1.clientX;
    const touch1Y = touch1.clientY;
    return Math.sqrt(Math.pow(touch1X - touch0X, 2) + Math.pow(touch1Y - touch0Y, 2));
  }

  changeSeat(isSoldUrl, index, item) {
    const tempIsSoldUrl = isSoldUrl;
    const { changeSeatConf, filmBuyList } = this.props;
    if (tempIsSoldUrl[index] === 'seat_white') {
      if (filmBuyList.item.length < 4) {
        tempIsSoldUrl[index] = 'seat_green';
        changeSeatConf(item, tempIsSoldUrl, 'add');
      } else {
        Alert('最多选四个座位！');
      }
    } else if (tempIsSoldUrl[index] === 'seat_green') {
      tempIsSoldUrl[index] = 'seat_white';
      changeSeatConf(item, tempIsSoldUrl, 'delete');
    }
  }

  render() {
    const { filmSeatList } = this.props;
    const { 
      left, 
      top, 
      scaleNum, 
      animationTime, 
      wrapperWidth, 
      isSoldUrl, 
      wrapperSmallWidth, 
      isSmallShow, 
      animationTimeSmall
    } = this.state;
    // scaleNum = 2
    const seatList = filmSeatList.seatArr;
    if (seatList) {
      const maxSize = this.getWrapperSize(seatList);
      const seatWidth = wrapperWidth / maxSize.maxX;
      const seatWrapperHeight = seatWidth * maxSize.maxY;
      const list = seatList.map((item, index) => {
        const style = {
          position: 'absolute',
          left: `${((seatWidth * (item.xAxis - 1)) + (seatWidth / 2)) - 0.01}rem`,
          top: `${seatWidth * (item.yAxis - 1)}rem`,
          width: `${seatWidth}rem`,
        };
        return (
          <Image  
            key={`seatId${index}`}
            style={[style, styles.seatItem]}
            source={require(`../../res/images/${isSoldUrl[index]}.png`)}
            onTouchTap={this.changeSeat.bind(this, isSoldUrl, index, item)}
          />
        );
      });
      const listNum = this.getSeatColNum(seatList, maxSize, seatWidth);
      const style = {
        width: `${wrapperWidth}rem`,
        height: `${seatWrapperHeight + 1}rem`,
        left: `${3.75 + (left / 100)}rem`,
        top: `${top / 100}rem`,
        marginLeft: `${-wrapperWidth / 2}rem`,
        transform: `scale(${scaleNum})`,
        MsTransform: `scale(${scaleNum})`,   /* IE 9 */
        MozTransform: `scale(${scaleNum})`,  /* Firefox */
        WebkitTransform: `scale(${scaleNum})`, /* Safari 和 Chrome */
        OTransform: `scale(${scaleNum})`,
        WebkitTransition: `all ${animationTime}ms linear`,
        MozTransition: `all ${animationTime}ms linear`,
        OTransition: `all ${animationTime}ms linear`,
        MsTransition: `all ${animationTime}ms linear`,
        transition: `all ${animationTime}ms linear`,
      };
      const styleNumIndexWrapper = {
        top: `${
          ((1 + (top / 100)) - ((seatWidth * maxSize.maxY * (scaleNum - 1)) / 2))
        }rem
        `, //算出缩放后和最初的变化值，除以二，给-top,里面小的li标签直接top*scale
        height: `${seatWrapperHeight * scaleNum}rem`,
        zIndex: 100
      };
      const splitLineLeft = Math.floor(wrapperWidth / seatWidth / 2);
      const styleSplitLine = {
        width: '0.01rem',
        height: `${seatWrapperHeight}rem`,
        borderLeft: '0.01rem dashed #d1d6db',
        position: 'absolute',
        left: `${((splitLineLeft * seatWidth) + (seatWidth / 2)) - 0.01}rem`
      };
      const styleListWrapper = {
        width: `${wrapperWidth}rem`,
        height: `${seatWrapperHeight}rem`,
        position: 'absolute',
        top: '1rem'
      };
      //小窗部分
      const seatSmallWidth = wrapperSmallWidth / maxSize.maxX;
      const wrapperSmallHeight = seatSmallWidth * maxSize.maxY;
      const listSmall = seatList.map((item, index) => {
        const smallStyle = {
          position: 'absolute',
          left: `${(seatSmallWidth) * (item.xAxis - 1)}rem`,
          top: `${(seatSmallWidth) * (item.yAxis - 1)}rem`,
          width: `${seatSmallWidth - 0.04}rem`,
          zIndex: 1,
        };
        return (
          <Image  
            key={`seatSmallId${index}`}
            style={[smallStyle, styles.seatItem]}
            source={require(`../../res/images/${isSoldUrl[index]}_small.png`)}
          />
        );
      });
      const styleSeatSmallWrapperList = {
        position: 'absolute',
        width: `${wrapperSmallWidth}rem`,
        height: `${wrapperSmallHeight}rem`,
        top: '0.2rem',
        left: '50%',
        marginLeft: `${-wrapperSmallWidth / 2}rem`,
        zIndex: 1000
      };
      const styleSeatSmallWrapperBorder = {
        position: 'absolute',
        width: `${(wrapperSmallWidth + 0.1)}rem`,
        height: `${(wrapperSmallHeight + 0.1)}rem`,
        top: `${0.1 - (top / 100 / scaleNum / 2)}rem`,
        left: `${1.25 - (left / 100 / scaleNum / 2)}rem`, //1.25为外层小窗宽度一半, 3为选座和小图宽度比
        marginLeft: `${(-(wrapperSmallWidth) / 2) - 0.1}rem`,
        zIndex: 1000,
        transform: `scale(${1 / scaleNum})`,
        MsTransform: `scale(${1 / scaleNum})`,   /* IE 9 */
        MozTransform: `scale(${1 / scaleNum})`,  /* Firefox */
        WebkitTransform: `scale(${1 / scaleNum})`, /* Safari 和 Chrome */
        OTransform: `scale(${1 / scaleNum})`,
      };
      const styleSeatSmallShow = {
        opacity: isSmallShow,
        WebkitTransition: `all ${animationTimeSmall}ms linear`,
        MozTransition: `all ${animationTimeSmall}ms linear`,
        OTransition: `all ${animationTimeSmall}ms linear`,
        MsTransition: `all ${animationTimeSmall}ms linear`,
        transition: `all ${animationTimeSmall}ms linear`,
      };
      return (
        <View>
          <View style={[styleSeatSmallShow, styles.seatSmallShow]}>
            <View style={styles.seatSmallShowBg} />
            <View style={styleSeatSmallWrapperList}>
              {listSmall}
            </View>
            <View style={[styleSeatSmallWrapperBorder, styles.seatSmallBorder]} />
          </View>
          <View 
            style={styles.seatWrapper}
            onTouchStart={this.onTouchStartWrapper.bind(this)}
          >
            <View style={[styleNumIndexWrapper, styles.numIndexWrapper]}>{listNum}</View>
            <View
              style={[style, styles.seatItemWrapper]}
              onTouchStart={this.onTouchStart.bind(this)}
              onTouchMove={this.onTouchMove.bind(this)}
              onTouchEnd={this.onTouchEnd.bind(this)}
            >
              <View style={styles.roomWrapper}>
                <Text style={styles.roomName}>{filmSeatList.roomName}</Text>
                <Text style={styles.roomCenter}>银幕中央</Text>
              </View>
              <View style={styleListWrapper}>
                <View style={styleSplitLine} />
                { list }
              </View>
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
// $bg_gray: #f4f6f8;
// $num_gray: #c3c5c6;
// $num_white: #f0f0f1;
// $gray_word: #7d838e;
// $black_bg: #000000;
// $red_border: #ff0000;
// .seatSmallBorder {
//   border: 0.01rem solid $red_border;
// }
// .seatSmallShow {
//   position: absolute;
//   width: 2.5rem;
//   height: 2rem;
//   z-index: 1000;

// }
// .seatSmallShowBg {
//   composes: seatSmallShow;
//   background-color: $black_bg;
//   opacity: 0.5;
//   overflow: hidden;
//   z-index: 1;
// }
// .seatWrapper {
//   width: 7.5rem;
//   height: 8.25rem;
//   background-color: $bg_gray;
//   position: relative;
//   overflow: hidden;
//   // bottom: 2.04rem;
// }
// .roomWrapper {
//   text-align: center;
// }
// .roomName {
//   font-size: 0.18rem;
// }
// .roomCenter {
//   font-size: 0.18rem;
//   color: $gray_word;
// }
// .seatItemWrapper {
//   position: absolute;
// }
// .seatItem {
// }
// .numIndexWrapper {
//   position: absolute;
//   width: 0.26rem;
//   top: 1rem;
//   background-color: $num_gray;
//   color: $num_white;
// }
// .numIndex {
//   position: absolute;
//   font-size: 0.2rem;
//   // display: inline-block;
// }
});

export default FilmSeat;


        <FilmSeatSale 
          filmBuyList={filmBuyList}
          filmSeatList={filmSeatList}
          changeSeatConf={this.changeSeatConf.bind(this)} 
        />