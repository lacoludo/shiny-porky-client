import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'native-base';
import { View } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const GOLD_COLOR = '#D4AF37';

class PurchaseButtonView extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render () {
    return (      
      <View style={{ flex: 1, alignItems: 'center', width: '100%', marginTop:10 }}>
        <Button style={{ width: '100%', backgroundColor: GOLD_COLOR, borderRadius: 25 }} onPress={this.props.onPress}>
          <Text style={{ width: '100%', fontSize: 20, textAlign: 'center' }}>ACHETER</Text>
        </Button>
      </View>
    );
  }
}

export default PurchaseButtonView;
