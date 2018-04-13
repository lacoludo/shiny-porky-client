import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Input, Item, Label, Text } from 'native-base';
import ButtonView from './../../components/ButtonView';
import { FontAwesomeSolid, FontAwesomeBrands } from "../../components/styles/StyledText";

const styles = StyleSheet.create({
  removeLeftSpace: {
    marginLeft: -15,
  },
  labelStyle: {
    marginTop: 25,
    marginLeft: 15,
    fontSize: 15,
    color: '#666666',
  },
  inputStyle: {
    width: '100%',
    paddingLeft: 9,
    borderWidth: 1,
    borderColor: '#b2b2b2',
  },
  addLeftSpace: {
    marginLeft: 30,
  },
  creditCardWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  creditCard: {
    fontSize: 75,
  },
  visa: {
    color: '#122d98',
  },
  mastercard: {
    color: '#e35205',
  }
});

class CreditCardForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    creditCard: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    const { creditCard } = props;

    this.state = {
      number: `************${creditCard.number}`,
      exp_month: creditCard.expMonth,
      exp_year: creditCard.expYear,
      name: creditCard.fullName,
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  submitForm = () => {
    this.props.onSubmitForm(this.state);
  }

  renderElement() {
    const visaFirstNumber = 4;
    const mastercardFirstNumber = 5;
    if (this.state.number.startsWith(visaFirstNumber)) {
      return <FontAwesomeBrands style={[styles.creditCard, styles.visa]}></FontAwesomeBrands>;
    } else if (this.state.number.startsWith(mastercardFirstNumber)) {
      return <FontAwesomeBrands style={[styles.creditCard, styles.mastercard]}></FontAwesomeBrands>;
    }
    return <FontAwesomeSolid style={[styles.creditCard]}></FontAwesomeSolid>;
  }

  render() {
    const { creditCard } = this.props;
    return ( 
      <Form>
        <Text>Nous garantissons la confidentialité de vos données et nous ne stockons pas vos informations de paiement.</Text>
        <View style={styles.creditCardWrapper}>
          {this.renderElement()}
        </View>
        <View style={styles.removeLeftSpace}>
          <Label style={styles.labelStyle}>Numéro de carte</Label>
          <View>
            <Item stackedLabel>
              <Input
                style={styles.inputStyle}
                placeholder={'1234 5678 9012 3456'}
                placeholderTextColor={'#b2b2b2'}
                value={`${this.state.number}`}
                onChangeText={v => this.handleChange('number', v)}
              />
            </Item>
          </View>
          <Label style={styles.labelStyle}>Date d'expiration</Label>
          <View style={{ flexDirection: 'row' }}>
            <Item stackedLabel style={{ flexDirection: 'row', width: '10%' }}>
              <Input
                style={styles.inputStyle}
                placeholder={'MM'}
                placeholderTextColor={'#b2b2b2'}
                value={`${this.state.exp_month}`}
                onChangeText={v => this.handleChange('exp_month', v)}
              />
            </Item>
            <Label style={{ marginTop: 14, marginLeft: 14 }}>/</Label>
            <Item stackedLabel style={{ flexDirection: 'row', width: '14%' }}>
              <Input
                style={styles.inputStyle}
                placeholder={'AAAA'}
                placeholderTextColor={'#b2b2b2'}
                value={`${this.state.exp_year}`}
                onChangeText={v => this.handleChange('exp_year', v)}
              />
            </Item>
            <Item stackedLabel style={{ flexDirection: 'row', width: '12%', marginLeft: 202 }}>
              <Input
                style={styles.inputStyle}
                placeholder={'CVC'}
                placeholderTextColor={'#b2b2b2'}
                value={this.state.cvc}
                onChangeText={v => this.handleChange('cvc', v)}
              />
            </Item>
          </View>
          <Label style={styles.labelStyle}>Nom sur la carte</Label>
          <View style={{ marginBottom: 50 }}>
            <Item stackedLabel>
              <Input
                style={styles.inputStyle}
                placeholder={'MME PRIYANKA CHOPRA'}
                placeholderTextColor={'#b2b2b2'}
                value={this.state.name}
                onChangeText={v => this.handleChange('name', v)}
              />
            </Item>
          </View>
        </View>
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'} isLoading={creditCard.isLoading} />
      </Form>
    )
  }
}

export default CreditCardForm;
