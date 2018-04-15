import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { StyledTextButton } from './styles/StyledTextForm';
import { StyledButtonView } from './styles/StyledButton';

class ButtonView extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  };

  static defaultProps = { isLoading: false };

  render() {
    const { label, onPress, isLoading } = this.props;
    return (      
      <TouchableOpacity onPress={onPress}>
        {!isLoading ? (
          <StyledButtonView>
            <StyledTextButton>{label.toUpperCase()}</StyledTextButton>
          </StyledButtonView>
        ) : (
          <StyledButtonView>
            <ActivityIndicator size="large" color="#fff" />
          </StyledButtonView>
        )}
      </TouchableOpacity>
    );
  }
}

export default ButtonView;
