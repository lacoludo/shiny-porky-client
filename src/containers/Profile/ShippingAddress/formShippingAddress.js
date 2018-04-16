import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Item, Label, Input, View } from 'native-base';
import ButtonView from './../../../components/ButtonView';

class ShippingAddressForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}).isRequired,
    isSaving: PropTypes.bool.isRequired,
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
    const { shippingAddress, isSaving } = this.props;
    return ( 
      <Form>
        <Item floatingLabel style={{ marginLeft: 0, marginTop: 10 }}>
          <Label>Adresse</Label>
          <Input
            value={`${this.state.line1}`}
            onChangeText={v => this.handleChange('line1', v)}
          />
        </Item>
        <Item floatingLabel style={{ marginLeft: 0, marginTop: 20 }}>
          <Label>Informations supplémentaires (optionnel)</Label>
          <Input
            value={`${this.state.line2}`}
            onChangeText={v => this.handleChange('line2', v)}
          />
        </Item>
        <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Item floatingLabel style={{ width: '50%' }}>
            <Label>Ville</Label>
            <Input
              value={`${this.state.city}`}
              onChangeText={v => this.handleChange('city', v)}
            />
          </Item>
          <Item floatingLabel style={{ width: '40%' }}>
            <Label>Code Postal</Label>
            <Input
              value={`${this.state.postalCode}`}
              onChangeText={v => this.handleChange('postalCode', v)}
            />
          </Item>
        </View>
        <Item floatingLabel style={{ marginLeft: 0, marginTop: 20, width: '70%' }}>
          <Label>Pays</Label>
          <Input
            value={this.state.country}
            onChangeText={v => this.handleChange('country', v)}
          />
        </Item>
        <Item floatingLabel style={{ marginLeft: 0, marginTop: 20, marginBottom: 20, width: '50%' }}>
          <Label>Téléphone</Label>
          <Input
            value={this.state.phone}
            onChangeText={v => this.handleChange('phone', v)}
          />
        </Item>
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'} isLoading={isSaving} />
        <View style={{ height: 45 }} />
      </Form>
    )
  }
}

export default ShippingAddressForm;
