import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Item, Label, Input } from 'native-base';
import { View } from 'react-native';
import ButtonView from './../../components/ButtonView';

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

  render() {
    const { creditCard } = this.props;
    return ( 
      <Form>
        <Item stackedLabel>
          <Label>Numéro de carte</Label>
          <Input
            placeholder={'1234 5678 9012 3456'}
            placeholderTextColor={'#b2b2b2'}
            value={`${this.state.number}`}
            onChangeText={v => this.handleChange('number', v)}
          />
        </Item>
        <Label style={{ marginLeft: 15, color: '#666666', fontSize: 15 }}>Date d'expiration   +   CVC</Label>
        <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
          <Item stackedLabel style={{ flex: 1, flexDirection: 'row', width: '15%' }}>
            <Input
              placeholder={'MM'}
              placeholderTextColor={'#b2b2b2'}
              value={`${this.state.exp_month}`}
              onChangeText={v => this.handleChange('exp_month', v)}
              style={{ width: '33%' }}
            />
          </Item>
          <Item stackedLabel style={{ flex: 1, flexDirection: 'row', width: '15%' }}>
            <Input
              placeholder={'AAAA'}
              placeholderTextColor={'#b2b2b2'}
              value={`${this.state.exp_year}`}
              onChangeText={v => this.handleChange('exp_year', v)}
              style={{ width: '33%' }}
            />
          </Item>
          <Item stackedLabel style={{ flex: 1, flexDirection: 'row', width: '15%' }}>
            <Input
              placeholder={'CVC'}
              placeholderTextColor={'#b2b2b2'}
              value={this.state.cvc}
              onChangeText={v => this.handleChange('cvc', v)}
              style={{ width: '33%' }}
            />
          </Item>
        </View>
        <Item stackedLabel>
          <Label>Nom sur la carte</Label>
          <Input
            placeholder={'MME PRIYANKA CHOPRA'}
            placeholderTextColor={'#b2b2b2'}
            value={this.state.name}
            onChangeText={v => this.handleChange('name', v)}
          />
        </Item>
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'} isLoading={creditCard.isLoading} />
      </Form>
    )
  }
}

export default CreditCardForm;
