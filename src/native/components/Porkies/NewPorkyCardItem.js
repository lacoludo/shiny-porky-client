import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Image } from 'react-native';

import AddIcon from './add-square-button.png';

import Spacer from './../Spacer';

class NewPorkyCardItem extends Component {
  render = () => {
    return (
      <CardItem cardBody style={{height: 200}}>
        <TouchableOpacity onPress={Actions.newPorky} style={{flex: 1}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={AddIcon}
          />
        </TouchableOpacity>
      </CardItem>
    );
  }
}

export default NewPorkyCardItem;