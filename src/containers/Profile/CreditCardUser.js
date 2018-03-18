import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createToken, getUserCreditCard } from '../../actions/stripes';

class CreditCardUser extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    getUserCreditCard: PropTypes.func.isRequired,
    creditCard: PropTypes.shape({}).isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  componentDidMount() {
    this.props.getUserCreditCard();
  }

  render () {
    const { creditCard, Layout, onFormSubmit, errorMessage, successMessage, isLoading } = this.props;
    return <Layout 
      error={errorMessage}
      success={successMessage}
      loading={isLoading}
      onFormSubmit={onFormSubmit}
      creditCard={creditCard}
      member={this.props.member}
    />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  creditCard: state.creditCard || null,
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: createToken,
  getUserCreditCard: getUserCreditCard
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardUser);
