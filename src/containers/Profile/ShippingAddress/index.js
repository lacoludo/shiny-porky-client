import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button } from 'native-base';
import { ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MessageView from './../../../components/MessageView';
import HeaderView from './../../../components/HeaderView';
import SpacerView from './../../../components/Spacer';
import FormShippingAddress from './formShippingAddress';
import { Background } from './../../../components/styles/StyledContainer';
import { getCustomerStripe, postShippingAddressToCustomer } from '../../../actions/stripes';

class ShippingAddress extends Component {

  componentDidMount() {
    this.props.getCustomerStripe(this.props.customerStripe);
  }

  onSubmitForm = (formData) => {
    const { customerStripe } = this.props;
    this.props.postShippingAddress(customerStripe, formData);
  }

  render() {
    const { isLoading, postShippingAddress, shippingAddress } = this.props;
    return ( 
      <Background>
        <Container>
          <HeaderView title="Mettre à jour votre adresse de livraison" />
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" style={{ height: 329}} />
          ) : (
            <FormShippingAddress shippingAddress={shippingAddress} onSubmitForm={this.onSubmitForm} />
          )}
        </Container>
      </Background>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.shippingAddress.isLoading,
  customerStripe: state.member.customerStripe,
  shippingAddress: state.shippingAddress.address,
});
  
const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerStripe: (customer) => getCustomerStripe(customer, dispatch),
    postShippingAddress: (customer, formData) => postShippingAddressToCustomer(customer, formData, dispatch),
    dispatch,
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
