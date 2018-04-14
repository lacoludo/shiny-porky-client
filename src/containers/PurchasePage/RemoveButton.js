import React, { PureComponent } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { FontAwesomeGrey } from '../../components/styles/StyledText';

export default class RemoveButton extends PureComponent {
  static propTypes = {
    removeGold: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { animationValue: new Animated.Value(0) };
    const scaleDownCircle = this.state.animationValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    });

    this.decrementCircleTransforms = { transform: [{ scale: scaleDownCircle }] };
  }

  animateCircle = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      this.state.animationValue.setValue(0);
      this.props.removeGold();
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.animateCircle}>
        <Animated.View style={[styles.counterDecrementStyle, this.decrementCircleTransforms]}>
          <FontAwesomeGrey></FontAwesomeGrey>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  counterDecrementStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#969998',
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 2 },
    shadowColor: 'black',
    backgroundColor: '#FFF',
  }
};