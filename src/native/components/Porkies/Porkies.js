import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PorkyCard from './PorkyCard';
import Loading from './../Loading';
import Error from './../Error';
import Spacer from './../Spacer';
import HeaderView from '../../../components/HeaderView';
import ButtonView from '../../../components/ButtonView';

class PorkyListing extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFavoritePorky: PropTypes.func.isRequired,
    reFetch: PropTypes.func,
    favouritePorkyId: PropTypes.string
  };

  static defaultProps = {
    error: null,
    reFetch: null
  };

  render() {
    const {
      error,
      loading,
      reFetch,
      onFavoritePorky,
      favouritePorkyId,
      porkies,
    } = this.props;
    if (loading) return <Loading />;
    if (error) return <Error content={ error } />;
    const keyExtractor = item => item.id;
    const onPress = (item) => {( Actions.porky({ match: { params: { id: String(item.id) } } }) )};

    return (
      <Container>
        <Content padder>
          <HeaderView title="Mes porkies" />
          {porkies.map((item) => {
            return (
              <PorkyCard
                key={item.id}
                favouritePorkyId={favouritePorkyId}
                onFavoritePorky={onFavoritePorky}
                porky={item}
                onPress={onPress}
                reFetch={reFetch}
              />
            )
          })}
          <ButtonView onPress={Actions.newPorky} label={'Nouveau Porky'}/>
          <View style={{ height: 30 }} />
        </Content>
      </Container>
    );
  }
}

export default PorkyListing;