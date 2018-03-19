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
    favouritePorky: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount = () => {
      this.props.getFavouritePorky(this.props.member.favoritePorky);
  };

  onPress = item => { Actions.porky({ match: { params: { id: this.props.member.favoritePorky } } })};
  onPressPurchase = item => { Actions.purchase({ match: { params: { id: this.props.member.favoritePorky  } } })};

  render = () => {
    const { favouritePorky } = this.props;
    return (
        <Container>
            <Content padder>
                <H3>Mon Porky favoris</H3>
                {<PorkyCard onFavoritePorky={null} isLoading={favouritePorky.loading} porky={favouritePorky} onPress={this.onPress}/>}
                <Button onPress={this.onPressPurchase}>
                  <Text>APPROVISIONNER</Text>
                </Button>
            </Content>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
    favouritePorky: state.favouritePorky || null,
    member: state.member || {},
});
function mapDispatchToProps(dispatch) {
  return {
    getFavouritePorky: (porkyId) => getFavouritePorky(porkyId, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
