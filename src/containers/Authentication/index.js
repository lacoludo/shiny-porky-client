import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Text , Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions/member';
import { View, TouchableOpacity } from 'react-native';

import  Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

class Authentification extends Component {

  constructor(props) {
    super(props);
    this.state = { page: 'login' };
  }

  toggleAuthentication = (page) => {
    this.setState({ page });
  }

  render() {
    const { page } = this.state;
    console.log(page)
    return (
      <Container>
        {page === 'login' && <Login toggleAuthentication={this.toggleAuthentication} />}
        {page === 'signUp' && <SignUp toggleAuthentication={this.toggleAuthentication} />}
        {page === 'forgotPassword' && <ForgotPassword toggleAuthentication={this.toggleAuthentication} />}
      </Container>
    );
  }
}
export default Authentification;
