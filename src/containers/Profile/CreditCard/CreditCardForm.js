import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Input, Item, Label, Text } from 'native-base';
import ButtonView from './../../../components/ButtonView';
import { FontAwesomeSolid, FontAwesomeBrands } from "../../../components/styles/StyledText";
import { validator } from './validators';

const styles = StyleSheet.create({
  removeLeftSpace: {
    marginLeft: -15,
  },
  addLeftSpace: {
    marginLeft: 30,
  },
  creditCardWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
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
      number: creditCard.number ? `************${creditCard.number}` : '',
      exp_month: creditCard.expMonth,
      exp_year: creditCard.expYear,
      name: creditCard.fullName,
    };
  }

  handleChange = (name, val) => {
    if(validator(name, val)) {
      this.setState({
        ...this.state,
        [name]: val,
      });
    }
  }

  submitForm = () => {
    this.props.onSubmitForm(this.state);
  }

  render() {
    const { creditCard } = this.props;
    const {
      number,
      exp_month,
      exp_year,
      cvc,
      name,
    } = this.state;

    return ( 
      <Form>
        <View style={styles.removeLeftSpace}>
          <View>
            <Item stackedLabel>
              <Label>Numéro de carte</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#b2b2b2"
                value={`${number}`}
                onChangeText={v => this.handleChange('number', v)}
              />
            </Item>
          </View>
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '50%', flex: 1, flexDirection: 'row' }}>
              <Item stackedLabel style={{ width: '20%' }}>
                <Label style={{ width: 200 }}>Date d'expiration</Label>
                <Input
                  placeholder="MM"
                  placeholderTextColor="#b2b2b2"
                  value={`${exp_month}`}
                  onChangeText={v => this.handleChange('exp_month', v)}
                />
              </Item>
              <Item stackedLabel style={{ width: '30%'}}>
                <Label> </Label>
                <Input
                  placeholder="YYYY"
                  placeholderTextColor="#b2b2b2"
                  value={`${exp_year}`}
                  onChangeText={v => this.handleChange('exp_year', v)}
                />
              </Item>
            </View>
              <Item stackedLabel style={{ width: '20%' }}>
                <Label style={{ width: 100 }}>CVC</Label>
                <Input
                  placeholder="999"
                  placeholderTextColor="#b2b2b2"
                  value={cvc}
                  onChangeText={v => this.handleChange('cvc', v)}
                />
              </Item>
          </View>
          <View style={{ marginBottom: 30, marginTop: 10 }}>
            <Item stackedLabel>
              <Label>Nom sur la carte</Label>
              <Input
                placeholder="MME PRIYANKA CHOPRA"
                placeholderTextColor="#b2b2b2"
                value={name}
                onChangeText={v => this.handleChange('name', v)}
              />
            </Item>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#999999', fontStyle: 'italic', fontSize: 13 }}>
            Nous acceptons les cartes suivantes:
          </Text>  
        </View>
        <View style={styles.creditCardWrapper}>
          <FontAwesomeBrands style={styles.visa}></FontAwesomeBrands>
          <FontAwesomeBrands style={styles.mastercard}></FontAwesomeBrands>
        </View>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ color: '#999999', fontStyle: 'italic', fontSize: 13 }}>
            Nous garantissons la confidentialité de vos données et nous ne stockons pas vos informations de paiement.
          </Text>  
        </View>
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'} isLoading={creditCard.isLoading} />
      </Form>
    )
  }
}

export default CreditCardForm;
