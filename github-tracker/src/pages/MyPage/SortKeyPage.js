import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import LanguageService, { FLAG_LANGUAGE } from '../../service/LanguageService';
import NavigationBar from '../../components/NavigationBar';
import SortCell from '../../components/SortCell';
import ArrayUtils from '../../utils/ArrayUtils';
import ViewUtils from '../../utils/ViewUtils';

class SortKeyPage extends Component {
  constructor(props) {
    super(props);
  
    this.dataArray = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: []
    };
  }

  componentDidMount() {
    this.languageService = new LanguageService(this.props.navigation.state.params.flag);
    this.loadData();
  }

  onBack() {
    if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
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
            this.onSave(true);
          }
        },
      ]
    );
  }

  onSave(isChecked) {
    if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigation.goBack();
      return;
    }
    this.getSortResult();
    this.languageService.save(this.sortResultArray);
    this.props.navigation.goBack();
  }

  getCheckedItems(result) {
    this.dataArray = result;
    const checkedArray = [];
    for (let i = 0, len = result.length; i < len; i++) {
      const data = result[i];
      if (data.checked) {
        checkedArray.push(data);
      }
    }
    this.setState({
      checkedArray
    });
    this.originalCheckedArray = ArrayUtils.clone(checkedArray);
  }

  getSortResult() {
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    for (let i = 0, l = this.originalCheckedArray.length; i < l; i++) {
      const item = this.originalCheckedArray[i];
      const index = this.dataArray.indexOf(item);
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
    }
  }

  loadData() {
    this.languageService.fetch()
      .then(result => {
        this.getCheckedItems(result);
      })
      .catch(error => {
        console.log(error);
      });
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

    const title = this.props.navigation.state.params.flag === FLAG_LANGUAGE ? '语言排序' : '标签排序';

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          style={{ backgroundColor: '#2196F3' }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <SortCell data={row} />}
        />
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
  }
});

export default SortKeyPage;
