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
  
    this.languageService = new LanguageService(FLAG_LANGUAGE.flag_key);
    this.changeValues = [];
    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onSave() {
    if (this.changeValues.length !== 0) {
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
    tempData.checked = !data.checked;
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

    return (
      <CheckBox
        style={{ 
          flex: 1,
          padding: 10
        }}
        onClick={() => this.toggleTag(data)}
        leftText={leftText}
        isChecked={data.checked}
        checkedImage={
          <Image 
            style={{ tintColor: '#6495ED' }}
            source={require('../../../res/images/ic_check_box.png')} 
          />
        }
        unCheckedImage={
          <Image 
            style={{ tintColor: '#6495ED' }}
            source={require('../../../res/images/ic_check_box_outline_blank.png')} 
          />
        }
      />
    );
  }

  render() {
    const rightButton = (
      <TouchableOpacity
        onPress={() => this.onSave()}
      >
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <NavigationBar
          title='自定义标签'
          style={{ backgroundColor: '#6495ED' }}
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

