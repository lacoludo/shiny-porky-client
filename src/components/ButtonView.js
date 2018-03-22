import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'native-base';
import { View, ActivityIndicator } from 'react-native';

const GOLD_COLOR = '#D4AF37';

class ButtonView extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  };

  static defaultProps = { isLoading: false };

  render () {
    const { label, onPress, isLoading } = this.props;
    return (      
      <View style={{ flex: 1, alignItems: 'center', width: '100%', marginTop:10 }}>
        {!isLoading ? (
          <Button style={{ width: '100%', backgroundColor: GOLD_COLOR, borderRadius: 25 }} onPress={onPress}>
            <Text style={{ width: '100%', fontSize: 20, textAlign: 'center' }}>{label}</Text>
          </Button>
        ) : (
          <Button block style={{ width: '100%', backgroundColor: GOLD_COLOR, borderRadius: 25 }}>
            <ActivityIndicator size="large" color="#fff" />
          </Button>
        )}
      </View>
    );
  }
}

export default ButtonView;
