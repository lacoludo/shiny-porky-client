import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DangerZone } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import favorite from '../images/favorite-star.json';

const { Lottie } = DangerZone;

class FavoritePorky extends Component {
  static propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    favoritePorky: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { animation: null };
  }

  componentDidMount() {
    this.loadAnimationAsync().then(() => {
      if (this.props.isFavorite) {
        this.animation.play();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFavorite) {
      this.animation.reset();
    }
  }

  playAnimation = () => {
    const { isFavorite, favoritePorky } = this.props;
    if (!isFavorite) {
      favoritePorky();
      this.animation.play();
    }
  };

  loadAnimationAsync = async () => {
    this.setState(
      { animation: JSON.parse(JSON.stringify(favorite)) },
      this._playAnimation
    );
  };

  render() {
    const { animation } = this.state;
    return (
      <View>
        {animation && (
          <TouchableOpacity onPress={this.playAnimation}>
            <Lottie
              speed={1.5}
              ref={(animation) => { this.animation = animation; }}
              style={{ width: 50, height: 50 }}
              resizeMode="cover"
              source={animation}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 40,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default FavoritePorky;
