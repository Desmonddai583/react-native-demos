import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: []
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, reducers.auth),
});

const store = createStore(
  rootReducer,
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
