import React from 'react';
import ChartView from './src/ChartView.js';

export default class App extends React.Component {
  render() {
    return (
      <ChartView style={{ flex: 1, margin: 10 }} />
    );
  }
}

