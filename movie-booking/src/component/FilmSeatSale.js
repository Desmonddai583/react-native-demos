import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class FilmSeatSale extends Component {
  constructor(props) {
    super(props);
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
        <View 
          key={`seatSalePosition${index}`}
          style={styles.seatSalePositionItem}
        >
          {item.rowId}排{item.columnId}座
          <View 
            onTouchTap={this.deleteBuySeat.bind(this, item)}
            style={styles.seatIcon}
          />
        </View>
      ));
      return (
        <View style={styles.seatSaleWrapper}>
          <Text style={styles.seatSalePosition}>{list}</Text>
          <View style={styles.seatSaleBtn}>
            <View style={styles.seatPrice}>
              <Text style={styles.seatPriceTitle}>￥{price * length}</Text>
              <Text style={styles.seatPriceSub}>￥{price}×{length}</Text>
            </View>
            <Text style={styles.seatBtn}>确认选座</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.seatSaleWrapperC}>
        <Text style={styles.seatSalePositionC}>一次最多选择四个座位</Text>
        <View style={styles.seatSaleBtn}>
          <View style={styles.seatPrice}>
            <Text style={styles.seatPriceTitle}>￥0</Text>
            <Text style={styles.seatPriceSub}>￥{price}×0</Text>
          </View>
          <Text style={styles.seatBtnC}>请先选座</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
// $red_word: #fe4b37;
// $gray_line: #d1d5da;
// $gray_bg: #afb7bf;
// $white_word: #ffffff;
// $black_word: #000000;
// .seatSaleWrapper {
//   position: fixed;
//   bottom: 0rem;
//   background-color: white;
// }
// .seatSaleWrapperC {
//   composes: seatSaleWrapper;
// }

// .seatSalePosition {
//   width: 6.9rem;
//   height: 1.09rem;
//   font-size: 0.28rem;
//   display: flex;
//   flex-direction: row;
//   margin-left: 0.3rem;
// }
// .seatSalePositionC {
//   width: 6.9rem;
//   height: 1.09rem;
//   line-height: 1.09rem;
//   font-size: 0.24rem;
//   display: flex;
//   flex-direction: row;
//   margin-left: 0.3rem;
// }
// .seatSalePositionItem {
//   position: relative;
//   color: $red_word;
//   width: 1.56rem;
//   height: 0.52rem;
//   background: url(/images/seat_position_border.png) center no-repeat;
//   background-size: 1.58rem 0.52rem;
//   text-align: center;
//   margin-top: 0.3rem;
//   padding-top: 0.13rem;
//   padding-right: 0.2rem;
// }
// .seatIcon {
//   position: absolute;
//   display: inline-block;
//   width: 0.3rem;
//   height: 0.3rem;
//   background: url(/images/seat_position_icon.png) center no-repeat;
//   background-size: 0.12rem 0.12rem;
//   left: 1.3rem;
//   top: 0.18rem;
// }
// .seatSaleBtn {
//   width: 7.5rem;
//   height: 0.95rem;
//   font-size: 0.30rem;
//   border-top: 0.01rem solid $gray_line;
// }

// .seatPrice {
//   float: left;
//   margin-left: 0.2rem;
//   margin-top: 0.12rem;
// }
// .seatPriceTitle {
//   font-size: 0.36rem;
//   color: $red_word;
// }
// .seatPriceSub {
//   font-size: 0.2rem;
//   margin-left: 0.05rem;
// }
// .seatBtn {
//   float: right;
//   padding: 0.34rem 0.82rem;
//   background-color: $red_word;
//   color: $white_word;
// }
// .seatBtnC {
//   composes: seatBtn;
//   background-color: $gray_bg;
// }
});

export default FilmSeatSale;
