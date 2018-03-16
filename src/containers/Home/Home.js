import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getFavouritePorky } from '../../actions/porkies';
import { Container, Content, Text, H1, H2, H3, Button } from 'native-base';

import PorkyCard from './../../native/components/Porkies/PorkyCard';

class Home extends Component {
  static propTypes = {
    getFavouritePorky: PropTypes.func.isRequired,
    home: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount = () => {
      this.props.getFavouritePorky(this.props.member.favoritePorky);
  };

  onPress = item => { Actions.porky({ match: { params: { id: this.props.member.favoritePorky } } })};

  render = () => {
    return (
        <Container>
            <Content padder>
                {!this.props.home.loading && <PorkyCard onFavoritePorky={null} porky={this.props.home} onPress={this.onPress}/>}
            </Content>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
    home: state.home || null,
    member: state.member || {},
});

const mapDispatchToProps = {
  getFavouritePorky,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
