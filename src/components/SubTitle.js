import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'native-base';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StyledTextButton } from './styles/StyledTextForm';
import { StyledButtonView } from './styles/StyledButton';

class SubTitle extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  render () {
    return (      
        <View>
           
        </View>
    );
  }
}

export default SubTitle;
