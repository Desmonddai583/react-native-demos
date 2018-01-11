import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const config = {
  key: 'primary',
  storage
};
const persistReducers = persistCombineReducers(config, reducers);

const store = createStore(
  persistReducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

// use .purge() to clean up the state
persistStore(store, null, () => {
  store.getState();
});

export default store;
