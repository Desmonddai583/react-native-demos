import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class FilmDetail extends Component {
  sale() {
    Alert.alert('提示', '没有API,暂无购票能使用！');
  }

  render() {
    const data = this.props.filmData || {};
    let verText = data.ver || '';
    verText = verText.replace(/[\u4e00-\u9fa5]+/g, '').replace(/\/$/, '');
    let dra = data.dra || '';
    dra = dra.replace(/<p>/, '').replace(/<\/p>/, '');
    let scoreView = '';
    if (data.showSnum) {
      scoreView = (
        <View style={styles.scoreView}>
          <Text style={styles.score}>{data.sc}分</Text>
          <Text style={styles.snum}>({data.snum}人评分)</Text>
        </View>
      );         
    } else {
      scoreView = (
        <View style={styles.scoreView}>
          <Text style={styles.score}>{data.wish}人想看</Text>
        </View>
      );
    }
    return (
      <View style={styles.detailWrap}>
        <View style={styles.detailView}>
          <Image source={{ uri: data.img }} style={styles.filmCover} />
          <View style={styles.infoView}>
            <Text style={styles.name}>{data.nm}</Text>
            <View style={styles.verWrap}>
              <View style={styles.verView}>
                <Text style={styles.verText}>{verText}</Text>
              </View>
            </View>                       
            {scoreView}                        
            <Text style={styles.textLineHeight}>{data.cat}</Text>
            <Text style={styles.textLineHeight}>{data.src}/{data.dur}分钟</Text>
            <Text style={styles.textLineHeight}>{data.rt}</Text>
          </View>
        </View>
        <View style={styles.draView}>
          <TouchableOpacity style={styles.bigBtn} onPress={() => this.sale()}>
            <Text style={styles.bigBtnText}>立即购票</Text>
          </TouchableOpacity>
          <Text>{dra}</Text>
        </View>
        <View style={styles.navView}>
          <Text style={styles.navTitle}>演员表</Text>
          <Text>{data.star}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filmCover: {
    width: 108,
    height: 148,
    borderWidth: 1,
    borderColor: '#fff'
  },    
  scoreView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    color: '#ff9a00',
  },
  snum: {
    color: '#ff9a00',
  },
  detailWrap: {
    flexDirection: 'column',
  },
  detailView: {
    flexDirection: 'row',
    height: 170,
    padding: 10,
    backgroundColor: '#55514c'
  },
  name: {
    fontSize: 18,
    color: '#fff'
  },
  infoView: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
  },
  verView: {
    backgroundColor: '#2895db',
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  verText: {
    color: '#fff',
    fontSize: 10,
  },
  verWrap: {
    flexDirection: 'row',
  },
  textLineHeight: {
    color: '#fff',
    lineHeight: 24
  },
  draView: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#e1e1e1',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  bigBtn: {
    backgroundColor: '#e54847',
    borderRadius: 2,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10
  },
  bigBtnText: {
    color: '#fff',
    textAlign: 'center',
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
  }
});
