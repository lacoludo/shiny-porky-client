import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';

import NewPorkyCard from './NewPorkyCard';
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
      <Card transparent style={{ paddingHorizontal: 6, maxWidth: '50%' }}>
        {porky.id ? (
          <CardItem cardBody>
            <Body>

            <Spacer size={130} />
                <Text style={{ fontWeight: '800' }}>{porky.name}</Text>
                <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(porky)}
                >
                    <Text>Nourrir</Text>
                </Button>
            </Body>
          </CardItem>
          ) : (
            <NewPorkyCard />
        )}
      </Card>
    );
  }
}

export default PorkyCard;