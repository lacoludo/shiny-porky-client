import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, StyleSheet, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';
import { DangerZone } from 'expo';
import PorkyCard from './PorkyCard';
import { Actions } from 'react-native-router-flux';
import Loading from './../Loading';
import Error from './../Error';
import Header from './../Header';
import Spacer from './../Spacer';
import ButtonView from '../../../components/ButtonView';

const { Lottie } = DangerZone;
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
    porkies.push({ id: 0 });
    this.state = { porkies };
  }
  state = {
    animation: null
  };
  componentWillMount() {
    this._playAnimation();
  }
  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };
  _loadAnimationAsync = async () => {
    let result = await fetch(
      "https://rawgit.com/airbnb/lottie-react-native/master/example/js/animations/TwitterHeart.json"
    );
    this.setState(
      { animation: JSON.parse(result._bodyText) },
      this._playAnimation
    );
  };
  render() {
    const {
      error,
      loading,
      reFetch,
      onFavoritePorky,
      favouritePorkyId
    } = this.props;
    const { porkies } = this.state;
    if (loading) return <Loading />;
    if (error) return <Error content={ error } />;
    const keyExtractor = item => item.id;
    const onPress = item => {( Actions.porky({ match: { params: { id: String(item.id) } } })); };
    return (
      <View style={ styles.animationContainer }>
        { this.state.animation && (
          <TouchableOpacity onPress={ this._playAnimation }>
            <Lottie
              ref={ animation => {
                this.animation = animation;
              }}
              style={{
                width: 400,
                height: 400,
                backgroundColor: "#eee"
              }}
              source={ this.state.animation }
              onPress={ () => this._playAnimation }
            />
          </TouchableOpacity>
        )}
      </View>
      // <Container>
      //   <Content padder>
      //     <FlatList
      //       data={porkies}
      //       renderItem={({ item }) => (
      //         <PorkyCard
      //           favouritePorkyId={favouritePorkyId}
      //           onFavoritePorky={onFavoritePorky}
      //           porky={item} onPress={onPress}
      //           reFetch={reFetch}
      //         />
      //       )}
      //       keyExtractor={keyExtractor}
      //       refreshControl={
      //         <RefreshControl
      //           refreshing={loading}
      //           onRefresh={reFetch}
      //         />
      //       }
      //     />
      //     <ButtonView
      //       onPress={this.onPressPurchase}
      //       label={"AJOUTER"}
      //     />
      //     <Spacer size={20} />
      //   </Content>
      // </Container>
    );
  }
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
export default PorkyListing;