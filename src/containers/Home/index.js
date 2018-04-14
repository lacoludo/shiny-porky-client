import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getFavouritePorky } from '../../actions/porkies';
import { Container, Content, Text, H1, H2, H3, Button } from 'native-base';
import GoldChart from './GoldChart';

import ButtonView from './../../components/ButtonView';
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

  onPress = item => Actions.porky({ match: { params: { id: this.props.member.favoritePorky } } });
  onPressPurchase = item => Actions.purchase({ porky: this.props.favouritePorky  });

  render = () => {
    const { favouritePorky } = this.props;
    return (
      <Container>
        <Content padder>
          <H3>Mon Porky favoris</H3>
          {<PorkyCard onFavoritePorky={null} isLoading={favouritePorky.loading} porky={favouritePorky} onPress={this.onPress}/>}
          <ButtonView onPress={this.onPressPurchase} label={'APPROVISIONNER'} />
          <GoldChart />
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
    getFavouritePorky: (porkyId, dispatch) => getFavouritePorky(porkyId, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
