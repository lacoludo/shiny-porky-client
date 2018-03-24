import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import ButtonView from './../../../components/ButtonView';

class ShippingAddressForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      line1: props.shippingAddress.line1,
      line2: props.shippingAddress.line2,
      city: props.shippingAddress.city,
      postalCode: props.shippingAddress.postalCode,
      country: props.shippingAddress.country,
      phone: props.shippingAddress.phone,
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
    const { shippingAddress } = this.props;
    return ( 
      <Form>
        <Item stackedLabel>
          <Label>Line1</Label>
          <Input
            value={`${this.state.line1}`}
            onChangeText={v => this.handleChange('line1', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Line2</Label>
          <Input
            value={`${this.state.line2}`}
            onChangeText={v => this.handleChange('line2', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Ville</Label>
          <Input
            value={`${this.state.city}`}
            onChangeText={v => this.handleChange('city', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Code Postal</Label>
          <Input
            value={`${this.state.postalCode}`}
            onChangeText={v => this.handleChange('postalCode', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Pays</Label>
          <Input
            value={this.state.country}
            onChangeText={v => this.handleChange('country', v)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Téléphone</Label>
          <Input
            value={this.state.phone}
            onChangeText={v => this.handleChange('phone', v)}
          />
        </Item>
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'}/>
      </Form>
    )
  }
}

export default ShippingAddressForm;
