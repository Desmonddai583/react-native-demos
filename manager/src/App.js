import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAxmIO2k6xyNuLQP-tIM6xiH7JsTvqI-jo',
      authDomain: 'manager-1baf9.firebaseapp.com',
      databaseURL: 'https://manager-1baf9.firebaseio.com',
      projectId: 'manager-1baf9',
      storageBucket: 'manager-1baf9.appspot.com',
      messagingSenderId: '756848213327'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
