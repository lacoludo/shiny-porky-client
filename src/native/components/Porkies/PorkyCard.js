import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, Card } from 'native-base';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import NewPorkyCardItem from './NewPorkyCardItem';
import PorkyCardItem from './PorkyCardItem';

class PorkyCard extends Component {
  static propTypes = {
    porky: PropTypes.shape({}).isRequired,
    reFetch: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    onFavoritePorky: PropTypes.func,
    isLoading: PropTypes.bool,
    favouritePorkyId: PropTypes.string,
  };

  render = () => {
    const { porky, onPress, onFavoritePorky, isLoading, favouritePorkyId } = this.props;
    return (
      <Card style={styles.Shadow}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ height: 329 }}
          />
        ) : (
          <View>
            <PorkyCardItem
              favouritePorkyId={favouritePorkyId}
              onFavoritePorky={onFavoritePorky}
              porky={porky}
              onPress={onPress}
            />
          </View>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  Shadow: {
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 0,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default PorkyCard;