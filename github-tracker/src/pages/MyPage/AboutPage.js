import React, { Component } from 'react';
import { 
  View,
  Linking
} from 'react-native';
import { MORE_MENU } from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ViewUtils from '../../utils/ViewUtils';
import AboutCommom, { FLAG_ABOUT } from './AboutCommon';
import config from '../../../res/data/config.json';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.aboutCommon = new AboutCommom(
      props, 
      (dict) => this.updateState(dict), 
      FLAG_ABOUT.flag_about,
      config
    );
    this.state = {
      projectModels: []
    };
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount();
  }

  onClick(tab) {
    let targetPage;
    const params = { ...this.props, menuType: tab };
    switch (tab) {
      case MORE_MENU.ABOUT_AUTHOR:
        // targetPage = 'my_custom_key';
        break;
      case MORE_MENU.WEBSITE:
        targetPage = 'my_about_website';
        params.url = 'https://github.com/Desmonddai583';
        params.title = 'GitHubPopular';
        break;
      case MORE_MENU.FEEDBACK: {
        const url = 'mailto://desmonddai583@gmail.com';
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log(`Can't handle url: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error('An error occurred', err));
        break;
      }
      default:
        break;
    }
    if (targetPage) {
      this.props.navigation.navigate(targetPage, params);
    }
  }

  updateState(dict) {
    this.setState(dict);
  }

  render() {
    const content = (
      <View>
        {this.aboutCommon.renderRepository(this.state.projectModels)}
        {
          ViewUtils.getSettingItem(
            () => this.onClick(MORE_MENU.WEBSITE), 
            require('../../../res/images/ic_computer.png'),
            MORE_MENU.WEBSITE,
            { tintColor: '#2196F3' }
          )
        }
        <View style={GlobalStyles.line} />
        {
          ViewUtils.getSettingItem(
            () => this.onClick(MORE_MENU.ABOUT_AUTHOR), 
            require('../../../res/images/ic_insert_emoticon.png'),
            MORE_MENU.ABOUT_AUTHOR,
            { tintColor: '#2196F3' }
          )
        }
        <View style={GlobalStyles.line} />
        {
          ViewUtils.getSettingItem(
            () => this.onClick(MORE_MENU.FEEDBACK), 
            require('../../../res/images/ic_feedback.png'),
            MORE_MENU.FEEDBACK,
            { tintColor: '#2196F3' }
          )
        }
      </View>
    );

    return this.aboutCommon.render(content, {
      name: 'GitHub Popular',
      description: '这是一个用来查看GitHub最受欢迎与最热项目的APP, 它基于React Native支持Android和IOS双平台。',
      avatar: 'http://avatar.csdn.net/1/1/E/1_fengyuzhengfan.jpg',
      backgroundImg: 'http://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg'
    });
  }
}

export default AboutPage;
