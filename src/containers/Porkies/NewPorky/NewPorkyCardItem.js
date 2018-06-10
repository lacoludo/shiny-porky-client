import React, { PureComponent } from 'react';
import { View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Text } from 'react-native';
import buttonView from '../../../components/ButtonView';

class NewPorkyCardItem extends PureComponent {

  render() {
    return (
        <TouchableOpacity onPress={Actions.newPorky}>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} />
        </TouchableOpacity>
    );
  }
}

export default NewPorkyCardItem;
