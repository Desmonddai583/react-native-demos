import FilmSeatData from '../../res/data/filmSeat.json';

export const FILM_SEATLIST_FETCH = 'FILM_SEATLIST_FETCH';
export const FILM_SEATLIST_ERROR = 'FILM_SEATLIST_ERROR';
export const FILM_SEATLIST_SUCESS = 'FILM_SEATLIST_SUCESS';

export const fetchFilmSeatList = () => (dispatch) => {
  dispatch({ type: 'FILM_SEATLIST_FETCH', text: '' });
  dispatch({ type: 'FILM_SEATLIST_SUCESS', text: FilmSeatData });
};

export const CHANGE_FILM_BUYSEAT = 'CHANGE_FILM_BUYSEAT';
export const changeFilmBuySeatList = (data) => ({
  type: 'CHANGE_FILM_BUYSEAT', text: data
});
