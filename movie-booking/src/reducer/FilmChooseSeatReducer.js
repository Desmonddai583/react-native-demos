import { combineReducers } from 'redux';
import * as FilmChooseSeatActions from '../action/FilmChooseSeatAction';

export const filmSeatList = (state = {}, action = {}) => {
  switch (action.type) {
    case FilmChooseSeatActions.FILM_SEATLIST_FETCH:
      return state;
    case FilmChooseSeatActions.FILM_SEATLIST_SUCESS:
      return action.text;
    default:
      return state;
  }
};

export const filmBuyList = (state = { item: [], isSoldUrl: {}, type: '' }, action = {}) => {
  switch (action.type) {
    case FilmChooseSeatActions.CHANGE_FILM_BUYSEAT: {
      const tempState = Object.assign({}, state);
      if (action.text.type === 'add') {
        tempState.item.push(action.text.item);
      } else {
        const index = tempState.item.indexOf(action.text.item);
        tempState.item.splice(index, 1);
      }
      tempState.isSoldUrl = action.text.isSoldUrl;
      tempState.type = action.text.type;
      return tempState;
    } 
    default:
      return state;
  }
};


export default combineReducers({
  filmSeatList,
  filmBuyList
});
