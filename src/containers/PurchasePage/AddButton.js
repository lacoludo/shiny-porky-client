import React, { PureComponent } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { FontAwesome } from '../../components/styles/StyledText';

export default class AddButton extends PureComponent {
  static propTypes = {
    addGold: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { animationValue: new Animated.Value(0) };
    const scaleDownCircle = this.state.animationValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    });

    this.incrementCirleTransforms = { transform: [{ scale: scaleDownCircle }] };
  }

  animateCircle = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      this.state.animationValue.setValue(0);
      this.props.addGold();
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.animateCircle}>
        <Animated.View style={[styles.counterIncrementStyle, this.incrementCirleTransforms]}>
          <FontAwesome></FontAwesome>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  counterIncrementStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 2 },
    shadowColor: 'black',
    backgroundColor: '#D4AF37',
  }
};