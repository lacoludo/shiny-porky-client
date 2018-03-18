import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createToken, getUserCreditCard } from '../../actions/stripes';

class CreditCardUser extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    getUserCreditCard: PropTypes.func.isRequired,
    creditCard: PropTypes.shape({}).isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  componentDidMount() {
    this.props.getUserCreditCard();
  }

  onFormSubmit = (customer, formData) => {
    const { dispatch } = this.props;
    this.props.onFormSubmit(customer, formData, dispatch);
  }

  render () {
    const { creditCard, Layout } = this.props;
    return <Layout 
      onFormSubmit={this.onFormSubmit}
      error={creditCard.error}
      success={creditCard.success}
      isLoading={creditCard.isLoading}
      creditCard={creditCard}
      member={this.props.member}
    />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  creditCard: state.creditCard || null,
});

function mapDispatchToProps(dispatch) {
  return {
    onFormSubmit: (customer, formData, dispatch) => createToken(customer, formData, dispatch),
    getUserCreditCard: () => getUserCreditCard,
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardUser);
