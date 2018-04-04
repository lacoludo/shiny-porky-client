import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PorkyCard from './PorkyCard';
import Loading from './../Loading';
import Error from './../Error';
import Spacer from './../Spacer';
import NewPorkyCardItem from './NewPorkyCardItem';

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

  constructor(props) {
    super(props);
    const { porkies } = props;
    porkies.push({ id:0 });
    this.state = { porkies };
  }

  render() {
    const {
      error,
      loading,
      reFetch,
      onFavoritePorky,
      favouritePorkyId,
    } = this.props;
    const { porkies } = this.state;
    if (loading) return <Loading />;
    if (error) return <Error content={ error } />;
    const keyExtractor = item => item.id;
    const onPress = (item) => {(
      Actions.porky({
        match: {
          params: {
            id: String(item.id)
          }
        }
      })
    )};

    return (
      <Container>
        <Content padder>
          { porkies.map((item) => {
            return (
              <PorkyCard
                key={ item.id }
                favouritePorkyId={ favouritePorkyId }
                onFavoritePorky={ onFavoritePorky }
                porky={ item }
                onPress={ onPress }
                reFetch={ reFetch }
              />
            )})}
          <Spacer size={ 20 } />
          <NewPorkyCardItem />
          <Spacer size={ 20 } />
        </Content>
      </Container>
    );
  }
}

export default PorkyListing;