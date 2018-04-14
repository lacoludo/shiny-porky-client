import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PorkyCard from './PorkyCard';
import HeaderView from '../../components/HeaderView';
import ButtonView from '../../components/ButtonView';
import { getUserPorkies, favoritePorky, setError } from '../../actions/porkies';

class PorkieListing extends Component {
  static propTypes = {
    porkies: PropTypes.array.isRequired,
    getUserPorkies: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    favouritePorkyId: PropTypes.string.isRequired,
    setFavouritePorky: PropTypes.func.isRequired,

  }

  componentDidMount = () => this.fetchPorkies();

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.porkies !== nextProps.porkies
      || this.props.loading !== nextProps.loading
      || this.props.favouritePorkyId !== nextProps.favouritePorkyId);
  }

  fetchPorkies = () => {
    return this.props.getUserPorkies();
  }

  onFavoritePorky = (id) => {
    const { dispatch } = this.props;
    this.props.setFavouritePorky(id, dispatch);
  }

  onPress = (item) => Actions.porky({ porky: item });

  render = () => {
    const { porkies, favouritePorkyId, loading } = this.props;
    if (porkies.error) return <Error content={ error } />;

    return (
      <Container>
        <Content padder>
          <HeaderView title="Mes porkies" />
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ height: 329 }}
            />
          ) : (
            <View>
            {porkies.map((item) => {
              return (
                <PorkyCard
                  key={item.id}
                  favouritePorkyId={favouritePorkyId}
                  onFavoritePorky={this.onFavoritePorky}
                  porky={item}
                  onPress={this.onPress}
                  reFetch={this.fetchPorkies}
                />
              )
            })}
            </View>
          )}
          <ButtonView onPress={Actions.newPorky} label={'Nouveau Porky'}/>
          <View style={{ height: 30 }} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.porkies.loading,
  porkies: state.porkies.porkies,
  favouritePorkyId: state.member.favoritePorky,
});

function mapDispatchToProps(dispatch) {
  return {
    getUserPorkies: () => getUserPorkies(dispatch),
    setFavouritePorky: (id, dispatch) => favoritePorky(id, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PorkieListing);
