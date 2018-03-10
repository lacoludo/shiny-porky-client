import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import PorkyCard from './Porkies/PorkyCard';
import NewPorkyCard from './Porkies/NewPorkyCard';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const PorkieListing = ({
  error,
  loading,
  porkies,
  reFetch,
}) => {
  if (loading) return <Loading />;
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;
  const onPress = item => { Actions.porky({ match: { params: { id: String(item.id) } } })};

  return (
    <Container>
      <Content padder>
        <Header
          title="My porkies"
          content="List of user's porkies"
        />
        <FlatList
          numColumns={2}
          data={porkies}
          renderItem={({ item }) => (
            <PorkyCard porky={item} onPress={onPress} reFetch={reFetch} />
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />
        <NewPorkyCard />
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

PorkieListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

PorkieListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default PorkieListing;
