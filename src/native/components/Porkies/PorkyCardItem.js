import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardItem, Body, Text, Left, Right, Thumbnail } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextCard } from '../../../components/styles/StyledText';
import FavoritePorky from '../../../components/FavoritePorky';
import PorkyIcon from './../../../images/porky-icon.png';

const styles = StyleSheet.create({
  Shadow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  }
});

class PorkyCardItem extends Component {
  static propTypes = {
    porky: PropTypes.shape().isRequired,
    onPress: PropTypes.func.isRequired,
    onFavoritePorky: PropTypes.func,
    favouritePorkyId: PropTypes.string,
  };

  favoritePorky = () => {
    const { porky } = this.props;
    this.props.onFavoritePorky(porky.id);
  }

  render() {
    const { porky, onPress, onFavoritePorky, favouritePorkyId } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress(porky)}>
        <CardItem style={styles.Shadow}>
          <Left>
            <Thumbnail square size={200} source={PorkyIcon} />
            <Body>
              <TextCard style={{ fontSize: 20 }}>{porky.name.toUpperCase()}</TextCard>
              <TextCard style={{ fontSize: 10 }} note>{'Last update'.toUpperCase()}</TextCard>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={styles.Shadow}>
          <TextCard style={{ fontSize: 128, textAlign: 'center', width: '100%' }}>{porky.gramme}</TextCard>
          <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }}/>
        </CardItem>
        <CardItem style={styles.Shadow}>
          <Left>
            <TextCard style={{ fontSize: 15 }}>{`Appartient à ${porky.childName}`.toUpperCase()}</TextCard>
          </Left>
          {onFavoritePorky &&
            <Right>
              <FavoritePorky isFavorite={porky.id === favouritePorkyId} favoritePorky={this.favoritePorky} />
            </Right>
          }
        </CardItem>
      </TouchableOpacity>
    );
  }
}

export default PorkyCardItem;
