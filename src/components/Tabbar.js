import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Image } from 'react-native';
import TITLE_SHINY_PORKY from '../images/title-shiny-porky.png';
const GOLD_COLOR = '#D4AF37';

class Tabbar extends Component {

  render () {
    return (      
      <View style={{ width: '100%' }}>
        <Image style={{ width: '100%', height:40 }} source={TITLE_SHINY_PORKY} />
      </View>
    );
  }
}

export default Tabbar;
