import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserPorkies, setError } from '../actions/porkies';

class PorkieListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    porkies: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getUserPorkies: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPorkies();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPorkies = () => {
    return this.props.getUserPorkies()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, porkies, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        porkyId={id}
        error={porkies.error}
        loading={porkies.loading}
        porkies={porkies.porkies}
        reFetch={() => this.fetchPorkies()}
      />
    );
  }
}

const mapStateToProps = state => ({
  porkies: state.porkies || {},
});

const mapDispatchToProps = {
  getUserPorkies,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PorkieListing);
