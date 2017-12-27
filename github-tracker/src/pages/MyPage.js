import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import { MORE_MENU } from '../common/MoreMenu';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtils from '../utils/ViewUtils';
import { FLAG_LANGUAGE } from '../service/LanguageService';

class MyPage extends Component {
  static navigationOptions = () => ({
    title: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={{ tintColor, height: 22, width: 22 }} 
        source={require('../../res/images/ic_my.png')} 
      />
    )
  });

  onClick(tab) {
    let targetPage;
    const params = { ...this.props, menuType: tab };
    switch (tab) {
      case MORE_MENU.CUSTOM_LANGUAGE:
        targetPage = 'my_custom_key';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.CUSTOM_KEY:
        targetPage = 'my_custom_key';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.REMOVE_KEY:
        targetPage = 'my_custom_key';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemoveKey = true;
        break;
      case MORE_MENU.SORT_KEY:
        targetPage = 'my_sort_key';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.SORT_LANGUAGE:
        targetPage = 'my_sort_key';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.CUSTOM_THEME:
        break;
      case MORE_MENU.ABOUT_AUTHOR:
        targetPage = 'my_about_author';
        break;
      case MORE_MENU.ABOUT:
        targetPage = 'my_about_main';
        break;
      default:
        break;
    }
    if (targetPage) {
      this.props.navigation.navigate(targetPage, params);
    }
  }

  getItem(tag, icon, text) {
    return ViewUtils.getSettingItem(
      () => this.onClick(tag), 
      icon, 
      text, 
      { tintColor: '#2196F3' }, 
      null
    );
  }
  
  render() {
    const navigationBar = (
      <NavigationBar
        title='我的'
        style={{ backgroundColor: '#2196F3' }}
      />
    );
    return (
      <View style={GlobalStyles.root_container}>
        {navigationBar}
        <ScrollView>
          <TouchableHighlight
            onPress={() => this.onClick(MORE_MENU.ABOUT)}
          >
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('../../res/images/ic_trending.png')}
                  style={[{ width: 40, height: 40, marginRight: 10 }, { tintColor: '#2196F3' }]}
                />
                <Text>GitHub Popular</Text>
              </View>
              <Image 
                source={require('../../res/images/ic_tiaozhuan.png')}
                style={[{ width: 22, height: 22, marginRight: 10 }, { tintColor: '#2196F3' }]}
              />
            </View>
          </TouchableHighlight>
          <View style={GlobalStyles.line} />
          <Text style={styles.groupTitle}>趋势管理</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.CUSTOM_LANGUAGE, 
            require('../../res/images/ic_custom_language.png'), 
            '自定义语言'
          )}
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.SORT_LANGUAGE, 
            require('../../res/images/ic_swap_vert.png'), 
            '语言排序'
          )}

          <View style={GlobalStyles.line} />
          <Text style={styles.groupTitle}>标签管理</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.CUSTOM_KEY, 
            require('../../res/images/ic_custom_language.png'), 
            '自定义标签'
          )}
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.SORT_KEY, 
            require('../../res/images/ic_swap_vert.png'), 
            '标签排序'
          )}
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.REMOVE_KEY, 
            require('../../res/images/ic_remove.png'), 
            '标签移除'
          )}

          <View style={GlobalStyles.line} />
          <Text style={styles.groupTitle}>设置</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.CUSTOM_THEME, 
            require('../../res/images/ic_view_quilt.png'), 
            '自定义主题'
          )}
          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.ABOUT_AUTHOR, 
            require('../../res/images/ic_insert_emoticon.png'), 
            '关于作者'
          )}
          <View style={GlobalStyles.line} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 90,
    backgroundColor: 'white'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});

export default MyPage;
