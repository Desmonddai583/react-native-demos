import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NavigationBar from '../../components/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import LanguageService, { FLAG_LANGUAGE } from '../../service/LanguageService';

class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
  
    this.languageService = new LanguageService(this.props.navigation.state.params.flag);
    this.changeValues = [];
    this.isRemoveKey = this.props.navigation.state.params.isRemoveKey;
    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onSave() {
    if (this.changeValues.length !== 0) {
      if (this.isRemoveKey) {
        for (let i = 0, l = this.changeValues.length; i < l; i++) {
          ArrayUtils.remove(this.state.tags, this.changeValues[i]);
        }
      }
      this.languageService.save(this.state.tags);
    }
    this.props.navigation.goBack();
  }

  onBack() {
    if (this.changeValues.length === 0) {
      this.props.navigation.goBack();
      return;
    }
    Alert.alert(
      '提示',
      '要保存修改吗?',
      [
        { text: '不保存', 
          onPress: () => {
            this.props.navigation.goBack();
          }, 
          style: 'cancel'
        },
        { text: '保存', 
          onPress: () => {
            this.onSave();
          }
        },
      ]
    );
  }

  loadData() {
    this.languageService.fetch()
      .then(result => {
        this.setState({
          tags: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleTag(data) {
    const tempData = data;
    if (!this.isRemoveKey) {
      tempData.checked = !data.checked;
    }
    ArrayUtils.updateArray(this.changeValues, tempData);
  }

  renderTags = () => {
    if (!this.state.tags || this.state.tags.length === 0) return null;
    const len = this.state.tags.length;
    const views = [];
    for (let i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.tags[i])}
            {this.renderCheckBox(this.state.tags[i + 1])}
          </View>
          <View style={styles.line} />
        </View>
      );
    }
    views.push(
      <View key={len - 1}>
        <View style={styles.item}>
          { len % 2 === 0 ? this.renderCheckBox(this.state.tags[len - 2]) : null }
          { this.renderCheckBox(this.state.tags[len - 1]) }
        </View>
        <View style={styles.line} />
      </View>
    );
    return views;
  }

  renderCheckBox(data) {
    const leftText = data.name;
    const isChecked = this.isRemoveKey ? false : data.checked;

    return (
      <CheckBox
        style={{ 
          flex: 1,
          padding: 10
        }}
        onClick={() => this.toggleTag(data)}
        leftText={leftText}
        isChecked={isChecked}
        checkedImage={
          <Image 
            style={{ tintColor: '#2196F3' }}
            source={require('../../../res/images/ic_check_box.png')} 
          />
        }
        unCheckedImage={
          <Image 
            style={{ tintColor: '#2196F3' }}
            source={require('../../../res/images/ic_check_box_outline_blank.png')} 
          />
        }
      />
    );
  }

  render() {
    let title = this.isRemoveKey ? '标签移除' : '自定义标签';
    title = this.props.navigation.state.params.flag === FLAG_LANGUAGE.flag_language ? 
      '自定义语言' : title;
    const rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
    const rightButton = (
      <TouchableOpacity
        onPress={() => this.onSave()}
      >
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>{rightButtonTitle}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          style={{ backgroundColor: '#2196F3' }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <ScrollView>
          {this.renderTags()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CustomKeyPage;

