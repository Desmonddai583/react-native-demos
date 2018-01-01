import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  ScrollView,
  Image,
  ProgressBarAndroid,
  Alert
} from 'react-native';

import Toolbar from '../../component/Toolbar';

export default class cinemaDetail extends Component {
  constructor(props) {
    super(props);
    this.data = null;
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = (month) < 10 ? `0${month}` : month;
    day = (day) < 10 ? `0${day}` : day;
    this.initDate = `${date.getFullYear()}-${month}-${day}`;
    this.movieIndex = 0;
    this.dateIndex = 0;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      data: null,
      date: this.initDate,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchData('');
  }

  onPressMovie(index, id) {
    this.movieIndex = index;
    this.dateIndex = 0; 
    this.fetchData(id);
  }

  onPressDate(index, date) {
    this.dateIndex = index;
    const showModel = this.data.DateShow[date];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(showModel),
    });
  }

  fetchData(_id) {
    const id = _id;
    const url = `https://m.maoyan.com/showtime/wrap.json?cinemaid=${this.props.navigation.state.params.id}&movieid=${id}`;
    if (_id !== '') {
      this.setState({
        loading: true,
      });
    }
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.data = responseData.data;
        console.log(url)
        const showModel = this.data.DateShow[this.initDate] || 
          this.data.DateShow[Object.keys(this.data.DateShow)[0]];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(showModel),
          data: responseData.data,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  sale() {
    Alert.alert('提示', '没有API,暂无购票能使用！');
  }

  loadingData() {
    if (this.state.loading) {
      return (
        <View>
          <ProgressBarAndroid color="#e54847" styleAttr="Horizontal" indeterminate />
        </View>
      );
    }
  }

  renderInfo() {
    const data = this.state.data;
    if (!data) {
      return (
        <View>
          <ProgressBarAndroid color="red" styleAttr='Inverse' />
        </View>
      );
    }

    const cinemaDetailModel = data.cinemaDetailModel;
    const cinemaInfo = (
      <View style={styles.cinemaInfo}>
        <Text>{cinemaDetailModel.addr}</Text>
        <Text>{cinemaDetailModel.tel[0] || ''}</Text>
      </View>
    );

    let currentMovieModel;
    const moviesModel = data.movies;
    const movies = [];
    for (let i = 0; i < moviesModel.length; i++) {
      if (i === this.movieIndex) {
        currentMovieModel = moviesModel[i];
        movies.push(
          <TouchableOpacity key={i} style={styles.movieView}>
            <Image source={{ uri: moviesModel[i].img }} style={styles.movieImgCur} />
          </TouchableOpacity>
        );
      } else {
        movies.push(
          <TouchableOpacity 
            key={i}
            style={styles.movieView} 
            onPress={this.onPressMovie.bind(this, i, moviesModel[i].id)} 
          >
            <Image source={{ uri: moviesModel[i].img }} style={styles.movieImg} />
          </TouchableOpacity>
        );
      }
    }

    const dateView = [];
    const dateModel = data.Dates;
    for (let i = 0; i < dateModel.length; i++) {
      if (i === this.dateIndex) {
        dateView.push(
          <TouchableOpacity key={i} style={[styles.dateView, styles.dateViewCur]}>
            <Text style={styles.dateTextCur}>{dateModel[i].text}</Text>
          </TouchableOpacity>
        );
      } else {
        dateView.push(
          <TouchableOpacity 
            key={i}
            style={styles.dateView} 
            onPress={this.onPressDate.bind(this, i, dateModel[i].slug)} 
          >
              <Text style={styles.dateText}>{dateModel[i].text}</Text>
          </TouchableOpacity>
        );
      }
    }

    let list;
    if (this.state.dataSource.cachedRowCount === 0) {
      list = (
        <View style={styles.emptyList}>
          <Text>今天已无放映场次</Text>
        </View>
      );
    } else {
      list = (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCinemaDetail}
          style={styles.ListView}
          enableEmptySections
        />
      );
    }
    
    return (
      <View style={styles.content}>
        {cinemaInfo}
        <View>
          <ScrollView style={styles.movieScroll} horizontal >
            {movies}
          </ScrollView>
        </View>
        <View style={styles.movieNameView}>
          <Text style={styles.movieNameText}>{currentMovieModel.nm}</Text>
        </View>
        <View>
          <ScrollView style={styles.dateScroll} horizontal showsHorizontalScrollIndicator={false}>
            {dateView}
          </ScrollView>
        </View>

        {list}
      </View>
    );
  }

  renderCinemaDetail = (showModel) => (
    <View style={styles.showModel}>
      <View style={styles.timeView}>
        <Text style={styles.timeStart}>{showModel.tm}</Text>
        <Text style={styles.timeEnd}>{showModel.end}结束</Text>
      </View>
      <View style={styles.thView}>
        <View style={styles.langView}>
          <Text>{showModel.lang}</Text><Text>{showModel.tp}</Text>
        </View>
        <Text>{showModel.th}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.sellText}>38</Text>
        <Text style={styles.priceText}>原价100</Text>
      </View>
      <View style={styles.buyView}>
        <TouchableOpacity style={styles.buyButton} onPress={() => this.sale()}>
          <Text style={styles.buyText}>选座购票</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <Toolbar {...this.props} />
        {this.loadingData()}
        {this.renderInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
  },
  cinemaInfo: {
    padding: 10,
    backgroundColor: '#fff'
  },
  movieScroll: {
    height: 124,
    backgroundColor: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    paddingRight: 3,
    flexDirection: 'row'
  },
  movieView: {
    paddingRight: 10,
  },
  movieImg: {
    width: 75,
    height: 104,
  },
  movieImgCur: {
    width: 75,
    height: 104,
    borderWidth: 2,
    borderColor: '#fff'
  },
  movieNameView: {
    padding: 10,
    backgroundColor: '#fff'
  },
  movieNameText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dateScroll: {
    padding: 10,
    borderColor: '#ddd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  dateView: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 8
  },
  dateViewCur: {
    backgroundColor: '#df2d2d',
    borderRadius: 18
  },
  dateTextCur: {
    color: '#fff'
  },
  showModel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  timeView: {
    flex: 1,
    width: 80,
  },
  thView: {
    flex: 2,
    alignItems: 'center',
  },
  timeStart: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#df2d2d',
    textAlign: 'center',
  },
  timeEnd: {
    fontSize: 12
  },
  langView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceView: {
    flex: 1,
    alignItems: 'center',
  },
  sellText: {
    fontSize: 20,
    color: '#df2d2d',
  },
  priceText: {
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  buyView: {
    flex: 1,
    alignItems: 'center',
  },
  buyButton: {
    padding: 4,
    backgroundColor: '#df2d2d',
    borderRadius: 2,
  },
  buyText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  ListView: {
    flex: 1
  },
  emptyList: {        
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  }
});
