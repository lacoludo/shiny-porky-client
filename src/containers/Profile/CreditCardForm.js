import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import ButtonView from './../../components/ButtonView';

import { createToken, getUserCreditCard } from '../../actions/stripes';

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

  render () {
    const { creditCard } = this.props;
    return ( 
      <Form>
        <Item stackedLabel>
          <Label>Number</Label>
          <Input
            value={`${this.state.number}`}
            onChangeText={v => this.handleChange('number', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Mois d'expiration</Label>
          <Input
            value={`${this.state.exp_month}`}
            onChangeText={v => this.handleChange('exp_month', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Année d'expiration</Label>
          <Input
            value={`${this.state.exp_year}`}
            onChangeText={v => this.handleChange('exp_year', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>CVC</Label>
          <Input
            value={this.state.cvc}
            onChangeText={v => this.handleChange('cvc', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Name</Label>
          <Input
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
