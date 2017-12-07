import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import PopularPage from './PopularPage';
import MyPage from './MyPage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tb_popular',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{ color: '#2196F3' }}
            title="最热"
            renderIcon={() => 
              <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />
            }
            renderSelectedIcon={() => 
              <Image 
                style={[styles.image, { tintColor: '#2196F3' }]} 
                source={require('../../res/images/ic_popular.png')} 
              />
            }
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}
          >
            <PopularPage />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{ color: 'yellow' }}
            title="趋势"
            renderIcon={() => 
              <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />
            }
            renderSelectedIcon={() => 
              <Image 
                style={[styles.image, { tintColor: 'yellow' }]} 
                source={require('../../res/images/ic_trending.png')} 
              />
            }
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}
          >
            <View style={{ backgroundColor: 'yellow', flex: 1 }} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{ color: 'green' }}
            title="收藏"
            renderIcon={() => 
              <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />
            }
            renderSelectedIcon={() => 
              <Image 
                style={[styles.image, { tintColor: 'green' }]} 
                source={require('../../res/images/ic_favorite.png')} 
              />
            }
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}
          >
            <View style={{ backgroundColor: 'green', flex: 1 }} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{ color: 'blue' }}
            title="我的"
            renderIcon={() => 
              <Image 
                style={styles.image} 
                source={require('../../res/images/ic_my.png')} 
              />
            }
            renderSelectedIcon={() => 
              <Image 
                style={[styles.image, { tintColor: 'blue' }]} 
                source={require('../../res/images/ic_my.png')} 
              />
            }
            onPress={() => this.setState({ selectedTab: 'tb_my' })}
          >
            <MyPage {...this.props} />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 22,
    width: 22
  }
});
