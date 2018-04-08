import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Right, Body, Text, H1, H2, H3, Button, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import { View , TouchableOpacity } from 'react-native';
import { purchaseGold } from '../../actions/stripes';
import { Card, CardItem } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ButtonView from './../../components/ButtonView';

const GOLD_COLOR = '#D4AF37';
const GRAMME_BY_LEVEL = 50;

class PurchasePage extends Component {
  static propTypes = {
    favouritePorky: PropTypes.shape({}).isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super();
    const grammeBase = 10;
    const currentLvlProgress = (grammeBase / GRAMME_BY_LEVEL) * 100;
    this.state = {  grammeBase, currentLvlProgress, grammeAdded: 0 };
  }

  purchaseGold = () => {
    const { token } = this.props.creditCard;
    const { customerStripe } = this.props.member;
    const { grammeAdded } = this.state;
    this.props.purchaseGold(token, this.props.favouritePorky, customerStripe, grammeAdded);
  }

  addGold = () => {
    const { grammeAdded, grammeBase, currentLvlProgress } = this.state;
    const calculGrammeAdded = grammeAdded + 5;
    const calculCurrentLvlProgress = ((grammeBase + calculGrammeAdded) / GRAMME_BY_LEVEL) * 100;

    this.setState({
      grammeAdded: calculGrammeAdded,
      currentLvlProgress: calculCurrentLvlProgress,
    })
  }

  render () {
    const { favouritePorky } = this.props;

    return (      
    <Container>
      <Content padder>
        <H2 style={{ textAlign: 'center', width: '100%' }}>{favouritePorky.name} NEED YOUR MONEY</H2>
        <Card style={{ paddingHorizontal: 6 }}>
          <CardItem cardBody>
            <H3 style={{ textAlign: 'center', width: '100%' }}>Prochain Palier</H3>
          </CardItem>
          <CardItem cardBody>
              <View style={{ flex: 1, alignItems: 'center', width: '100%', marginTop:10 }}>
                <AnimatedCircularProgress
                size={250}
                width={10}
                fill={this.state.currentLvlProgress}
                tintColor={GOLD_COLOR}
                rotation={0}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={'transparent'}>
                {
                  (fill) => (
                    <Text>
                      {this.state.grammeAdded}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
              </View>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <TouchableOpacity onPress={this.addGold}>
                <Icon style={{color: '#000'}} active name="ios-add" />
              </TouchableOpacity>
            </Body>
            <Right>
              <Text>
                -
              </Text>
            </Right>
          </CardItem>
        </Card>
        <ButtonView onPress={this.purchaseGold} label={'Acheter'}/>
      </Content>
    </Container>);
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  creditCard: state.creditCard || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
  favouritePorky: state.favouritePorky || null,
});

function mapDispatchToProps(dispatch) {
  return {
    purchaseGold: (token, porkyId, customerStripe, grammeAdded) => purchaseGold(token, porkyId, customerStripe, grammeAdded, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
