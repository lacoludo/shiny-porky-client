import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createToken } from '../../actions/stripes';

class CreditCardUser extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  render () {
    const { member, Layout, onFormSubmit, errorMessage, successMessage, isLoading } = this.props;
    return <Layout 
      error={errorMessage}
      success={successMessage}
      loading={isLoading}
      onFormSubmit={onFormSubmit}
      creditCard={member.creditCard}
    />;
  }
}


const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: createToken
};
export default connect(mapStateToProps, mapDispatchToProps)(CreditCardUser);
