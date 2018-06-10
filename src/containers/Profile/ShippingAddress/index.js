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
import { TextCard } from '../../../components/styles/StyledText';
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
    const {
      isLoading,
      postShippingAddress,
      shippingAddress,
      isSaving,
    } = this.props;
    return ( 
      <Background>
        <Container>
          <Content padder>
            <HeaderView title="Mettre à jour votre adresse de livraison" />
            <View style={{ marginVertical: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#DDD' }}>
              <TextCard>Une adresse de livraison est indispensable pour récupérer l'or d'un Shiny Porky !</TextCard>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" style={{ height: 329}} />
            ) : (
              <FormShippingAddress
                shippingAddress={shippingAddress}
                onSubmitForm={this.onSubmitForm}
                isSaving={isSaving}
              />
            )}
          </Content>
        </Container>
      </Background>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.shippingAddress.isLoading,
  customerStripe: state.member.customerStripe,
  shippingAddress: state.shippingAddress.address,
  isSaving: state.shippingAddress.isSaving,
});
  
const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerStripe: (customer) => getCustomerStripe(customer, dispatch),
    postShippingAddress: (customer, formData) => postShippingAddressToCustomer(customer, formData, dispatch),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
