import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Screen, Divider } from '@shoutem/ui';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider, connect } from 'react-redux';

import rootReducer from './src/reducer';
import { initData } from './src/actions';
import CurrentValue from './src/CurrentValue';
import TransactionVolumeGraph from './src/TransactionVolumeGraph';
import Description from './src/Description';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

class App extends Component {
    state = {
        fontLoaded: false,
    }

    componentDidMount() {
        this.loadAssetsAsync();
        const { dispatch } = this.props;

        dispatch(initData());
    }

    async loadAssetsAsync() {
        await Expo.Font.loadAsync({
         'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded) {
            return <View><Text>123</Text></View>  // render some progress indicator
        }
        return (
            <Screen>
                <Divider />
                <CurrentValue />
                <Divider />
                <Divider />
                <TransactionVolumeGraph />
                <Divider />
                <Description />
            </Screen>
        )
    }
}

const ConnectedApp = connect(state => state)(App);

export default () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
)
