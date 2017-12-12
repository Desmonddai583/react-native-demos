import React, { Component } from 'react';
import { 
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Image
} from 'react-native';

class SortCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        delayLongPress={500} 
        style={styles.item} 
        {...this.props.sortHandlers}
      > 
        <View style={styles.row}>
          <Image 
            style={styles.image}
            source={require('../../res/images/ic_sort.png')} 
          />
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    tintColor: '#2196F3',
    height: 16,
    width: 16,
    marginRight: 10
  }
});

export default SortCell;
