import React, { Component } from 'react';
import { 
  View,
  Clipboard,
  StyleSheet,
  Linking
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ViewUtils from '../../utils/ViewUtils';
import AboutCommom, { FLAG_ABOUT } from './AboutCommon';
import config from '../../../res/data/config.json';

const FLAG = {
  REPOSITORY: '开源项目',
  BLOG: {
    name: '技术博客',
    items: {
      PERSONAL_BLOG: {
          title: '个人博客',
          url: 'http://jiapenghui.com',
      },
      CSDN: {
          title: 'CSDN',
          url: 'http://blog.csdn.net/fengyuzhengfan',
      },
      JIANSHU: {
          title: '简书',
          url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
      },
      GITHUB: {
          title: 'GitHub',
          url: 'https://github.com/crazycodeboy',
      },
    }
  },
  CONTACT: {
    name: '联系方式',
    items: {
      QQ: {
          title: 'QQ',
          account: '1586866509',
      },
      Email: {
          title: 'Email',
          account: 'crazycodeboy@gmail.com',
      },
    }
  },
  QQ: {
    name: '技术交流群',
    items: {
      MD: {
          title: '移动开发者技术分享群',
          account: '335939197',
      },
      RN: {
          title: 'React Native学习交流群',
          account: '165774887',
      }
    },
  },
};

class AboutMePage extends Component {
  constructor(props) {
    super(props);
    this.aboutCommon = new AboutCommom(
      props, 
      (dict) => this.updateState(dict), 
      FLAG_ABOUT.flag_about_me,
      config
    );
    this.state = {
      projectModels: [],
      author: config.author,
      showRepository: false,
      showBlog: false,
      showQQ: false,
      showContact: false
    };
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount();
  }

  onClick(tab) {
    let targetPage;
    const params = { ...this.props, menuType: tab };
    switch (tab) {
      case FLAG.BLOG.items.CSDN:
      case FLAG.BLOG.items.GITHUB:
      case FLAG.BLOG.items.JIANSHU:
      case FLAG.BLOG.items.PERSONAL_BLOG: {
        targetPage = 'my_about_website';
        params.title = tab.title;
        const url = tab.url;
        params.url = url;
        break;
      }   
      case FLAG.REPOSITORY:
        this.updateState({
          showRepository: !this.state.showRepository
        });
        break;
      case FLAG.BLOG:
        this.updateState({
          showBlog: !this.state.showBlog
        });
        break;
      case FLAG.QQ:
        this.updateState({
          showQQ: !this.state.showQQ
        });
        break;
      case FLAG.CONTACT:
        this.updateState({
          showContact: !this.state.showContact
        });
        break;
      case FLAG.CONTACT.items.QQ:
        Clipboard.setString(tab.account);
        this.refs.toast.show(`QQ:${tab.account}已复制到剪切板.`, DURATION.LENGTH_LONG);
        break;
      case FLAG.QQ.items.MD:
        Clipboard.setString(tab.account);
        this.refs.toast.show(`群号:${tab.account}已复制到剪切板.`, DURATION.LENGTH_LONG);
        break;
      case FLAG.QQ.items.RN:
        Clipboard.setString(tab.account);
        this.refs.toast.show(`群号:${tab.account}已复制到剪切板.`, DURATION.LENGTH_LONG);
        break;
      case FLAG.CONTACT.items.Email: {
        const url = `mailto://${tab.account}`;
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

  getClickIcon(isShow) {
    return isShow ? 
      require('../../../res/images/ic_tiaozhuan_up.png') :
      require('../../../res/images/ic_tiaozhuan_down.png');
  }

  updateState(dict) {
    this.setState(dict);
  }

  renderItems(dic, isShowAccount) {
    if (!dic) return null;
    const views = [];
    for (const i in dic) {
      if (Object.prototype.hasOwnProperty.call(dic, i)) {
        const title = isShowAccount ? `${dic[i].title}:${dic[i].account}` : dic[i].title;
        views.push(
          <View key={i}>
            {
              ViewUtils.getSettingItem(
                () => this.onClick(dic[i]), 
                '', 
                title, 
                { tintColor: '#2196F3' }
              )
            }
            <View style={GlobalStyles.line} />
          </View>
        );
      }
    }
    return views;
  }

  render() {
    const content = (
      <View>
        {
          ViewUtils.getSettingItem(
            () => this.onClick(FLAG.BLOG), 
            require('../../../res/images/ic_computer.png'),
            FLAG.BLOG.name,
            { tintColor: '#2196F3' },
            this.getClickIcon(this.state.showBlog)
          )
        }
        <View style={GlobalStyles.line} />
        {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}
        {
          ViewUtils.getSettingItem(
            () => this.onClick(FLAG.REPOSITORY), 
            require('../../../res/images/ic_code.png'),
            FLAG.REPOSITORY,
            { tintColor: '#2196F3' },
            this.getClickIcon(this.state.showRepository)
          )
        }
        <View style={GlobalStyles.line} />
        {
          this.state.showRepository ? 
            this.aboutCommon.renderRepository(this.state.projectModels) : null
        }
        {
          ViewUtils.getSettingItem(
            () => this.onClick(FLAG.QQ), 
            require('../../../res/images/ic_computer.png'),
            FLAG.QQ.name,
            { tintColor: '#2196F3' },
            this.getClickIcon(this.state.showQQ)
          )
        }
        <View style={GlobalStyles.line} />
        {this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null}
        {
          ViewUtils.getSettingItem(
            () => this.onClick(FLAG.CONTACT), 
            require('../../../res/images/ic_contacts.png'),
            FLAG.CONTACT.name,
            { tintColor: '#2196F3' },
            this.getClickIcon(this.state.showContact)
          )
        }
        <View style={GlobalStyles.line} />
        {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
      </View>
    );

    return (
      <View style={styles.container}>
        {this.aboutCommon.render(content, this.state.author)}
        <Toast ref='toast' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AboutMePage;
