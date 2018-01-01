import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class FilmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  getFilmInfo(id, name) {
    this.props.navigation.navigate('film_info', {
      id,
      name
    });
  }

  fetchData() {
    const url = 'https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.movies)
        });
      });
  }

  sale() {
    Alert.alert('提示', '没有API,暂无购票能使用！');
  }

  renderFilm = (film) => {
    const verText = film.ver.replace(/[\u4e00-\u9fa5]+/g, '').replace(/\/$/, '');
    const wishOrSc = film.preSale ? `${film.wish}人想看` : `${film.sc}分`;
    const showInfo = film.preSale ? film.rt : film.showInfo;
    return (
      <TouchableOpacity onPress={() => this.getFilmInfo(film.id, film.nm)}>
        <View style={styles.nav}>
          <Image source={{ uri: film.img }} style={styles.filmCover} />
          <View style={styles.info}>
            <View style={styles.nameView}>
              <Text style={styles.nm}>{film.nm}</Text>
              <View style={styles.verView}>
                <Text style={styles.verText}>{verText}</Text>
              </View>
            </View>
            <Text>{film.cat}</Text>
            <Text>{film.scm}</Text>
            <Text style={styles.showInfo}>{showInfo}</Text>
            <View style={styles.saleView}>
              <Text style={styles.sc}>{wishOrSc}</Text>
              <TouchableOpacity 
                style={film.preSale ? styles.preSale : styles.sale}  
                onPress={() => this.sale()}
              >
                <Text 
                  style={film.preSale ? styles.preSaleText : styles.saleText}
                >
                  {film.preSale ? '预售' : '购票'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFilm}
        style={styles.ListView}
        enableEmptySections
      />
    );
  }
}

const styles = StyleSheet.create({
  filmCover: {
    width: 80,
    height: 110,
    borderRadius: 2
  },
  nav: {
    padding: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  nm: {
    color: '#333',
    fontSize: 16,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
  },
  nameView: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  showInfo: {
    fontSize: 12
  },
  verView: {
    justifyContent: 'center',
    backgroundColor: '#2895db',
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  verText: {
    color: '#fff',
    fontSize: 10
  },
  sc: {
    color: '#ff9a00'
  },
  saleView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  preSale: {
    borderWidth: 1,
    borderColor: '#159df1',
    borderRadius: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  sale: {
    borderWidth: 1,
    borderColor: '#49d95d',
    borderRadius: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  preSaleText: {
    color: '#159df1',
  },
  saleText: {
    color: '#49d95d',
  }
});
