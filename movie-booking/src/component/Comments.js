import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.loadComments(this.props.dataSource);
  }

  componentWillReceiveProps(nextProps) {
    this.loadComments(nextProps.dataSource);
  }

  loadComments(dataSource) {
    if (!dataSource) return;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataSource),
    });
  }

  moreComment() {  
    this.props.navigation.navigate('more_comment', {
      id: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name
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
          source={require('../../res/images/star.png')} 
          style={styles.starIcon} 
        />
      );
    }
    for (let i = 0; i < grayStar; i++) {
      grayStarView.push(
        <Image 
          key={`gray-star-${i}`} 
          source={require('../../res/images/star2.png')} 
          style={styles.starIcon} 
        />
      );
    }
    const avatarSource = data.avatarurl.length === 0 ?
     require('../../res/images/me.png') : {
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
    return (
      <View>
        <View style={styles.navView}>
          <Text style={styles.navTitle}>短评</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderComments}
            enableEmptySections
          />
          <TouchableOpacity style={styles.moreView} onPress={() => this.moreComment()}>
            <Text style={styles.more}>查看全部评论</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moreView: {
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
  },
  more: {
    textAlign: 'center',
    color: '#e54847'
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
  navTitle: {
    lineHeight: 30
  },
  comments: {
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#e1e1e1'
  },
  commentsText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
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
  }
});
