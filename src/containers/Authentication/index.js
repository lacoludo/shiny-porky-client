import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Text , Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions/member';
import { View, TouchableOpacity } from 'react-native';

import  Login from './Login';
import SignUp from './SignUp';

class Authentification extends Component {

  constructor(props) {
    super(props);
    this.state = { signUp: false };
  }

  toggleAuthentication = () => {
    this.setState({ signUp: !this.state.signUp });
  }

  render() {
    const { signUp } = this.state;
    return (
      <Container>
        {!signUp ? (
          <Login toggleAuthentication={this.toggleAuthentication} />
        ) : (
          <SignUp toggleAuthentication={this.toggleAuthentication} />
        )}
      </Container>
    );
  }
}
export default Authentification;
