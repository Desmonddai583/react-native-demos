import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import FilmSeat from '../../component/FilmSeat';
import FilmSeatSale from '../../component/FilmSeatSale';
import FilmSeatTitle from '../../component/FilmSeatTitle';
import * as FilmChooseSeatActions from '../../action/FilmChooseSeatAction';

class CinemaSalePage extends Component {
  componentWillMount() {
    const { getFilmSeatList } = this.props;
    getFilmSeatList('../../res/data/filmSeat.json', '');
  }

  changeSeatConf(item, isSoldUrl, type) {
    const { changeFilmBuySeatList } = this.props;
    const data = {
      item, 
      isSoldUrl,
      type
    };
    changeFilmBuySeatList(data);
  }

  render() {
    const { filmSeatList, filmBuyList } = this.props;
    const location = this.props.navigation.state.params.location;
    return (
      <View style={{ flex: 1 }}>
        <FilmSeatTitle location={location} />
        <FilmSeat 
          filmSeatList={filmSeatList}
          filmBuyList={filmBuyList}
          changeSeatConf={this.changeSeatConf.bind(this)} 
        />
        <FilmSeatSale 
          filmBuyList={filmBuyList}
          filmSeatList={filmSeatList}
          changeSeatConf={this.changeSeatConf.bind(this)} 
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFilmSeatList: (url, data) => dispatch(FilmChooseSeatActions.fetchFilmSeatList(url, data)),
  changeFilmBuySeatList: (data) => dispatch(FilmChooseSeatActions.changeFilmBuySeatList(data))
});

const mapStateToProps = (state) => ({
  filmSeatList: state.filmChooseSeatReducer.filmSeatList,
  filmBuyList: state.filmChooseSeatReducer.filmBuyList
});

export default connect(mapStateToProps, mapDispatchToProps)(CinemaSalePage);
