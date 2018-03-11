import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import stripe from 'stripe-client';


class CreditCardUser extends Component {

  render () {
    const { Layout } = this.props;
    console.log(stripe);

    return <Layout />;
  }
}

export default CreditCardUser;
