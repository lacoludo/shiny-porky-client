import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class AnimatedGramme extends Component {
	static propTypes = {
    gramme: PropTypes.number.isRequired,
    grammeAdded: PropTypes.number.isRequired,
    counterAnimation: PropTypes.object,
    shakeAnimation: PropTypes.object,
  };
  
  constructor(props) {
    super(props);

    const textStyle = this.props.counterAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.5, 1]
    });
    this.textStyleTransform = { transform: [{ scale: textStyle }] };
    this.shakeMotionTransform = {
      transform: [
        {
          translateX: this.props.shakeAnimation.interpolate({
            inputRange: [0, 0.08, 0.25, 0.41, 0.58, 0.75, 0.92, 1],
            outputRange: [0, -10, 10, -10, 10, -5, 5, 0]
          })
        }
      ]
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.gramme !== nextProps.gramme
      || this.props.grammeAdded !== nextProps.grammeAdded);
  }

  conditionalStyle = () => this.props.grammeAdded !== 0 ? this.textStyleTransform : this.shakeMotionTransform;

  render() {
    const { gramme, grammeAdded } = this.props;

    return (
      <Animated.View style={{ backgroundColor: 'transparent', width: 500, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.Text style={[styles.textStyle, this.conditionalStyle()]}>
          {gramme + grammeAdded}
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = {
  textStyle: {
		fontSize: 100,
		fontFamily: 'rajdhani-semibold',
		fontWeight: 'bold',
		color: '#969998',
  }
};