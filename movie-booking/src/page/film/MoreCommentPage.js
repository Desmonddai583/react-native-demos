import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ProgressBarAndroid,
  Image
} from 'react-native';

import Toolbar from '../../component/Toolbar';

export default class moreComment extends Component {
  constructor(props) {
    super(props);
    this.num = 15;
    this.comments = [];
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  loadMore = () => {
    this.num += 15;
    this.fetchData();
  }

  fetchData() {
    const url = `https://m.maoyan.com/mmdb/comments/movie/${this.props.navigation.state.params.id}.json?_v_=yes&offset=${this.num}`;
    this.setState({
      loading: true
    });
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {            
          let arr = [];
          arr = this.comments.concat(responseData.cmts);
          this.comments = arr;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.comments),
            loading: false,
          });
      });
  }

  renderComments(data) {
    const star = ~~data.score;
    const grayStar = 5 - star;
    const starView = [];
    const grayStarView = [];
    for (let i = 0; i < star; i++) {
      starView.push(
        <Image 
          key={`star-${i}`} 
          source={require('../../../res/images/star.png')} 
          style={styles.starIcon} 
        />
      );
    }
    for (let i = 0; i < grayStar; i++) {
      grayStarView.push(
        <Image 
          key={`gray-star-${i}`} 
          source={require('../../../res/images/star2.png')} 
          style={styles.starIcon} 
        />
      );
    }
    const avatarSource = data.avatarurl.length === 0 ?
     require('../../../res/images/me.png') : {
       uri: data.avatarurl 
     };

    return (
      <View key={data.id} style={styles.comments}>
        <View style={styles.starView}>
          <View style={styles.stars}>
              {starView}{grayStarView}
          </View>
          <Text>{data.time}</Text>
        </View>
        <Text style={styles.commentsText}>{data.content}</Text>
        <View style={styles.userView}>
          <Image 
            source={avatarSource} 
            style={styles.avatar} 
          />
          <Text style={styles.nickName}>{data.nickName}</Text>
        </View>
      </View>
    );
  }

  render() {
    let loading = null;
    if (this.state.loading) {
      loading = (
        <View>
          <ProgressBarAndroid color="#e54847" styleAttr="Horizontal" indeterminate />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Toolbar {...this.props} />
        {loading}
        <View style={styles.navView}>
            <View style={styles.commentsTitle}><Text>热门短评</Text></View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderComments}
              style={styles.commentRows}
              onEndReached={this.loadMore}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  navView: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#e1e1e1',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10
  },
  comments: {
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  commentsText: {
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nickName: {
    marginLeft: 10
  },
  starIcon: {
    width: 10,
    height: 10,
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  starText: {
    color: '#ff9a00',
  },
  stars: {
    flexDirection: 'row'
  },
  commentsTitle: {
    height: 30
  }
});

