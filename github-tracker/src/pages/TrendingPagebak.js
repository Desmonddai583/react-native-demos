import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image,
  TextInput
} from 'react-native';
import DataRepository, { FLAG_STORAGE } from '../service/DataRepository';

class TrendingPage extends Component {
  static navigationOptions = () => ({
    title: '趋势',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_trending.png')} 
      />
    )
  });

  constructor(props) {
    super(props);
  
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    this.state = {
      data: ''
    };
  }

  onClick() {
    this.loadData(`https://github.com/trending/${this.text}`);
  }

  loadData(url) {
    this.dataRepository.fetchRepository(url)
      .then((data) => {
        this.setState({
          data: JSON.stringify(data),
        });
      })
      .catch((error) =>
        this.setState({
          data: error
        })
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 30, borderWidth: 1 }}
          onChangeText={text => this.text = text}
        />
        <Text 
          style={{ fontSize: 20, margin: 10 }}
          onPress={() => this.onClick()}
        >
          加载数据
        </Text>
        <Text style={{ flex: 1 }}>
          {this.state.data}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default TrendingPage;
