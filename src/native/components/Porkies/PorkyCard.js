import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, Thumbnail, Icon } from 'native-base';

import NewPorkyCardItem from './NewPorkyCardItem';
import PorkyCardItem from './PorkyCardItem';
import Spacer from './../Spacer';

class PorkyCard extends Component {
  static propTypes = {
    porky: PropTypes.shape().isRequired,
    reFetch: PropTypes.func,
    onPress: PropTypes.func.isRequired,
  };

  render = () => {
    const { porky, onPress } = this.props;

    return (
      <Card style={{ paddingHorizontal: 6 }}>
        {porky.id !== 0 ? (
            <PorkyCardItem porky={porky} onPress={onPress}/>
          ) : (
            <NewPorkyCardItem />
        )}
      </Card>
    );
  }
}

export default PorkyCard;