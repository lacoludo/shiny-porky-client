import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getFavouritePorky } from '../../actions/porkies';
import { Container, Content } from 'native-base';
import { View } from 'react-native';
import GoldChart from './GoldChart';
import HeaderView from '../../components/HeaderView';
import ButtonView from './../../components/ButtonView';
import PorkyCard from '../Porkies/PorkyCard';

class Home extends Component {
  static propTypes = {
    getFavouritePorky: PropTypes.func.isRequired,
    favouritePorky: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  onPress = item => Actions.porky({ porky: this.props.favouritePorky });
  onPressPurchase = item => Actions.purchase({ porky: this.props.favouritePorky  });

  render = () => {
    const { favouritePorky } = this.props;
    return (
      <Container>
        <Content padder>
          <HeaderView title="Mon Porky du moment !" />
          {<PorkyCard isLoading={favouritePorky.loading} porky={favouritePorky} onPress={this.onPress}/>}
          <ButtonView onPress={this.onPressPurchase} label={'APPROVISIONNER'} />
          <View style={{ height: 20 }} />
          <HeaderView title="Cours de l'or" />
          <GoldChart />
          <View style={{ height: 40 }} />
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
