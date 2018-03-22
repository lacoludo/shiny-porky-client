import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserPorkies, favoritePorky, setError } from '../actions/porkies';

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
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPorkies();

  fetchPorkies = () => {
    return this.props.getUserPorkies();
  }

  onFavoritePorky = (id) => {
    const { dispatch } = this.props;
    this.props.setFavouritePorky(id, dispatch);
  }

  render = () => {
    const { Layout, porkies, match, favouritePorkyId } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        porkyId={id}
        error={porkies.error}
        loading={porkies.loading}
        porkies={porkies.porkies}
        onFavoritePorky={this.onFavoritePorky}
        favouritePorkyId={favouritePorkyId}
        reFetch={() => this.fetchPorkies()}
      />
    );
  }
}

const mapStateToProps = state => ({
  porkies: state.porkies || {},
  favouritePorkyId: state.member.favoritePorky || null,
});

function mapDispatchToProps(dispatch) {
  return {
    getUserPorkies: () => getUserPorkies(dispatch),
    setFavouritePorky: (id, dispatch) => favoritePorky(id, dispatch),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PorkieListing);
