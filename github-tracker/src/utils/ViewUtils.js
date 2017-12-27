import React from 'react';
import { 
  TouchableOpacity,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

class ViewUtils {
  static getSettingItem(callBack, icon, text, tintStyle, expandableIcon) {
    return (
      <TouchableHighlight
        onPress={callBack}
      >
        <View style={styles.item}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={icon || null}
              resizeMode='stretch'
              style={[{ width: 16, height: 16, marginRight: 10 }, tintStyle]}
            />
            <Text>{text}</Text>
          </View>
          <Image 
            source={
              expandableIcon || require('../../res/images/ic_tiaozhuan.png')
            }
            style={[{ width: 22, height: 22, marginRight: 10 }, { tintColor: '#2196F3' }]}
          />
        </View>
      </TouchableHighlight>
    );
  }

	static getLeftButton(callBack) {
    return (
      <TouchableOpacity
        style={{ padding: 8 }}
        onPress={callBack}
      >
        <Image
          style={{ width: 26, height: 26, tintColor: 'white' }}
          source={require('../../res/images/ic_arrow_back_white_36pt.png')}
        />
      </TouchableOpacity>    
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
    backgroundColor: 'white'
  }
});

export default ViewUtils;
