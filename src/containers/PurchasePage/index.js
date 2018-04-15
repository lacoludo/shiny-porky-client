import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Right, Left, Body, Text, H1, H2, H3, Button, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import { View , TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { purchaseGold } from '../../actions/stripes';
import { Card, CardItem } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ButtonView from '../../components/ButtonView';
import HeaderView from '../../components/HeaderView';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import AnimatedGramme from './AnimatedGramme';
import { SubTitleText } from '../../components/styles/StyledTitleView';
import { TextPurchaseLevel } from '../../components/styles/StyledText';
import { levelGetter } from '../../utils/levelGetter';

const GOLD_COLOR = '#D4AF37';

class PurchasePage extends Component {
  static propTypes = {
    porky: PropTypes.shape({}).isRequired,
    member: PropTypes.shape({}).isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);
    const { level }= this.props.porky;
    const grammeBase = this.props.porky.gramme - level.total;
    const currentLvlProgress = (grammeBase / level.expRequired) * 100;

    this.state = {
      counterAnimation: new Animated.Value(0),
      shakeAnimation: new Animated.Value(0),
      grammeBase,
      currentLvlProgress,
      grammeAdded: 0,
      currentLvl: level.level,
      expRequired: level.expRequired,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.porky !== nextProps.porky
      || this.props.member !== nextProps.member
      || this.props.successMessage !== nextProps.successMessage
      || this.props.errorMessage !== nextProps.errorMessage
      || this.props.success !== nextProps.success
      || this.state.counterAnimation !== nextState.counterAnimation
      || this.state.shakeAnimation !== nextState.shakeAnimation
      || this.state.currentLvlProgress !== nextState.currentLvlProgress
      || this.state.grammeAdded !== nextState.grammeAdded);
  }

  purchaseGold = () => {
    const { token } = this.props.creditCard;
    const { customerStripe } = this.props.member;
    const { grammeAdded } = this.state;
    this.props.purchaseGold(token, this.props.porky, customerStripe, grammeAdded);
  }

  animateCounterAnimation = () => {
    Animated.timing(this.state.counterAnimation, {
      toValue: 1,
      duration: 250,
    }).start(() => this.state.counterAnimation.setValue(0));
  }

  animateShakeAnimation = () => {
    Animated.timing(this.state.shakeAnimation, {
      toValue: 1,
      duration: 250
    }).start(() => this.state.shakeAnimation.setValue(0));
  };

  addGold = () => {
    const calculGrammeAdded = this.state.grammeAdded + 5;
    this.progression(calculGrammeAdded);
  }

  removeGold = () => {
    const { grammeAdded } = this.state;
    if (grammeAdded > 0) {
      const calculGrammeAdded = grammeAdded - 5;
      this.progression(calculGrammeAdded);
    }

    this.animateShakeAnimation();
  }

  progression = (grammeAdded) => {
    const { grammeBase, currentLvlProgress, expRequired, currentLvl } = this.state;
    let nextLevel = currentLvl;
    let nextGrammeBase = grammeBase;
    let nextExpRequired = expRequired;
    let calculCurrentLvlProgress = ((nextGrammeBase + grammeAdded) / expRequired) * 100;

    if (calculCurrentLvlProgress === 100) {
      const currentNextLevel = levelGetter(this.props.porky.gramme + grammeAdded);
      nextLevel = currentNextLevel.level;
      nextGrammeBase = this.props.porky.gramme - currentNextLevel.total;
      nextExpRequired = currentNextLevel.expRequired;
      calculCurrentLvlProgress = 0.1;
    }
    if (calculCurrentLvlProgress < 0) {
      const currentNextLevel = levelGetter(this.props.porky.gramme + grammeAdded);
      console.log(nextLevel);
      nextLevel = currentNextLevel.level;
      nextGrammeBase = this.props.porky.gramme - currentNextLevel.total;
      nextExpRequired = currentNextLevel.expRequired;
      calculCurrentLvlProgress = 99.5;
    }

    this.setState({
      grammeAdded,
      currentLvlProgress: calculCurrentLvlProgress,
      currentLvl: nextLevel,
      grammeBase: nextGrammeBase,
      expRequired: nextExpRequired,
    });
    this.animateCounterAnimation();
  }

  render () {
    const { porky } = this.props;
    return (      
    <Container>
      <Content padder>
        <HeaderView title={`${porky.name} a besoin d'or !`} />
        <CardItem cardBody style={{ marginTop: 10, marginBottom: 10 }}>
          <TextPurchaseLevel>
            Ton porky est actuellement niveau {porky.level.level}, il te manque {porky.level.remainingExp}g d'or.
          </TextPurchaseLevel>
        </CardItem>
        <Card style={styles.Shadow}>
          <CardItem cardBody style={{ justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
            <SubTitleText>Prochain Palier: {this.state.currentLvl}</SubTitleText>
          </CardItem>
          <CardItem cardBody>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', marginTop:10 }}>
              <AnimatedCircularProgress
                size={300}
                width={15}
                fill={this.state.currentLvlProgress}
                tintColor={GOLD_COLOR}
                rotation={0}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={'transparent'}
              >
                {(fill) => (
                  <AnimatedGramme
                    counterAnimation={this.state.counterAnimation}
                    shakeAnimation={this.state.shakeAnimation}
                    gramme={porky.gramme}
                    grammeAdded={this.state.grammeAdded}
                  />
                )}
              </AnimatedCircularProgress>
            </View>
          </CardItem>
          <CardItem cardBody style={{ marginBottom: 15, marginTop: 15 }}>
            <Left style={{ marginLeft: 15 }}>
              <RemoveButton removeGold={this.removeGold} />
            </Left>
            <Right style={{ marginRight: 15 }}>
              <AddButton addGold={this.addGold} />
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
});

function mapDispatchToProps(dispatch) {
  return {
    purchaseGold: (token, porky, customerStripe, grammeAdded) => purchaseGold(token, porky, customerStripe, grammeAdded, dispatch),
  };
};

const styles = StyleSheet.create({
  Shadow: {
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 0,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
