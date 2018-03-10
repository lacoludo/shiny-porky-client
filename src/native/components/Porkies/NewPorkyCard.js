import React from 'react';
import PropTypes from 'prop-types';
import { Card, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';

import Spacer from './../Spacer';

const NewPorkyCard = () => {
  return (
    <Card>
      <TouchableOpacity onPress={Actions.newPorky} style={{ flex: 1 }}>
        <Body>
            <Spacer size={10} />
            <Text style={{ fontWeight: '800' }}>Nouveau porky</Text>
            <Spacer size={15} />
            <Spacer size={5} />
        </Body>
      </TouchableOpacity>
    </Card>
  );
};

export default NewPorkyCard;
