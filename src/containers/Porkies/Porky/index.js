import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H1, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Error from '../../../native/components/Error';
import Spacer from '../../../native/components/Spacer';

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
  },
  red: {
    color: 'red',
  },
});

class Porky extends Component {
  static propTypes = {
    error: PropTypes.string,
    porkyId: PropTypes.string.isRequired,
    porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  render() {
    const { error, porkies, porkyId } = this.props;

    if (error) return <Error content={error} />;
    let porky = null;
  
    if (porkyId && porkies) {
      porky = porkies.find(item => item.id === porkyId );
    }
    if (!porky) return <Error content={ErrorMessages.recipe404} />;
  
    return (
      <Container>
        <Content padder>
          <Spacer size={25} />
          <H1 style={styles.title}>{porky.name}</H1>
          <Text>by {porky.gramme}</Text>
          <Spacer size={15} />
          <Spacer size={20} />
        </Content>
      </Container>
    );
  }
}

export default Porky;