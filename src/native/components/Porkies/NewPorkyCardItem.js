import React, { Component } from 'react';
import { View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Image } from 'react-native';

import AddIcon from './add-square-button.png';

class NewPorkyCardItem extends Component {
  render = () => {
    return (
      <View
        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <TouchableOpacity
          onPress={ Actions.newPorky }
          style={{ flex: 1 }}
        >
          <Image
            style={{width: '100%', height: '100%'}}
            source={AddIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewPorkyCardItem;