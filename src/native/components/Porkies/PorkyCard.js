import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, Card } from 'native-base';
import { ActivityIndicator, View } from 'react-native';
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
      <Content padder>
        <Card
          style={{ paddingHorizontal: 6 }}
        >
          { isLoading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ height: 329 }}
            />
          ) : (
            <View>
              <PorkyCardItem
                favouritePorkyId={ favouritePorkyId }
                onFavoritePorky={ onFavoritePorky }
                porky={ porky }
                onPress={ onPress }
              />
            </View>
          )}
        </Card>
        {/* <NewPorkyCardItem /> */}
      </Content>
    );
  }
}

export default PorkyCard;