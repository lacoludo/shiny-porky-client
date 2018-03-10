import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPorky } from '../../actions/porkies';

const NewPorky = ({
  Layout,
  onFormSubmit,
  isLoading,
  errorMessage,
  successMessage,
}) => (
  <Layout
    loading={isLoading}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
  />
);

NewPorky.propTypes = {
  Layout: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

NewPorky.defaultProps = {
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: createPorky,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPorky);
