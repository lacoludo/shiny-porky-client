import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardItem, Body, Text, Left, Right, Thumbnail, Icon } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import FavoritePorky from '../../../components/FavoritePorky';
import PorkyIcon from './../../../images/porky-icon.png';

class PorkyCardItem extends Component {
  static propTypes = {
    porky: PropTypes.shape().isRequired,
    onPress: PropTypes.func.isRequired,
    onFavoritePorky: PropTypes.func,
    favouritePorkyId: PropTypes.string,
  };

  favoritePorky = (id) => {
    this.props.onFavoritePorky(id);
  }

  render() {
    const { porky, onPress, onFavoritePorky, favouritePorkyId } = this.props;
    console.log(porky.id);
    return (
      <TouchableOpacity onPress={() => onPress(porky)}>
        <CardItem >
          <Left>
            <Thumbnail square size={200} source={PorkyIcon} />
            <Body>
              <Text>{porky.name}</Text>
              <Text note>Last update</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Text style={{fontSize: 128, textAlign: 'center', width: '100%'}}>{porky.gramme}</Text>
          <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Icon name="ios-person" />
            <Text>{`Appartient à ${porky.childName}`}</Text>
          </Left>
          {onFavoritePorky &&
            <Right>
              <FavoritePorky isfavorite={porky.id === favouritePorkyId} />
            </Right>
          }
        </CardItem>
      </TouchableOpacity>
    );
  }
}

export default PorkyCardItem;
