import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import PorkyCard from './PorkyCard';
import { Actions } from 'react-native-router-flux';
import Loading from './../Loading';
import Error from './../Error';
import Header from './../Header';
import Spacer from './../Spacer';

class PorkyListing extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    reFetch: PropTypes.func,
  };

  static defaultProps = {
    error: null,
    reFetch: null,   
  };

  constructor(props) {
    super(props);
    const { porkies } = props;
    porkies.push({id: 0});
    this.state = { porkies };
  }

  render() {
    const { error, loading, reFetch } = this.props;
    const { porkies } = this.state;

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
            data={porkies}
            renderItem={({ item }) => (
              <PorkyCard porky={item} onPress={onPress} reFetch={reFetch}/>
            )}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={reFetch}
              />
            }
          />
          <Spacer size={20} />
        </Content>
      </Container>
    );
  }
}

export default PorkyListing;