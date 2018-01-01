import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import FilmDetail from '../../component/FilmDetail';
import Comments from '../../component/Comments';
import Toolbar from '../../component/Toolbar';

export default class filmInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: null,
        filmData: null
      };
    }

    componentDidMount() {
      this.id = this.props.navigation.state.params.id;
      this.name = this.props.navigation.state.params.name;
      this.fetchData();
    }

    fetchData() {
      const url = `https:/m.maoyan.com/movie/${this.props.navigation.state.params.id}.json`;
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          const comments = responseData.data.CommentResponseModel.hcmts;
          comments.length = 5;
          this.setState({
            dataSource: comments,
            filmData: responseData.data.MovieDetailModel
          });
        });
    }

    render() {
      return (
        <View style={styles.container}>
            <Toolbar {...this.props} />
            <ScrollView style={styles.ScrollView}>
                <FilmDetail filmData={this.state.filmData} />
                <Comments dataSource={this.state.dataSource} {...this.props} />
            </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  ScrollView: {
    flex: 1,
  }
});
