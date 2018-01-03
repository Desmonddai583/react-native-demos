import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filmChooseSeatReducer from '../src/reducer/FilmChooseSeatReducer';

const store = createStore(
  combineReducers({ filmChooseSeatReducer }),
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
