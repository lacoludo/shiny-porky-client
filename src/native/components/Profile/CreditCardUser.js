import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './../Messages';
import Loading from './../Loading';
import Header from './../Header';
import Spacer from './../Spacer';

var stripe = require('stripe-client')('pk_test_7lMCWcAX9YQNeP5uEuGTFGsv');

class CreditCardUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        number: '4242424242424242',
        exp_month: '02',
        exp_year: '21',
        cvc: '999',
        name: 'Billy Joe'
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  
  render() {
    const { loading, error, success } = this.props;
    if (loading) return <Loading />;

    async function createCard(information) {
      var card = await stripe.createToken({ card: information});
      // send token to backend for processing
    };
  
    return (
      <Container>
        <Content padder>
          <Header title="Update credit card account" />

          <Form>
            <Item stackedLabel>
              <Label>Number</Label>
              <Input
                value={this.state.number}
                onChangeText={v => this.handleChange('number', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Mois d'expiration</Label>
              <Input
                value={this.state.exp_month}
                onChangeText={v => this.handleChange('exp_month', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Année d'expiration</Label>
              <Input
                value={this.state.exp_year}
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

            <Button block onPress={() => createCard(this.state)}>
              <Text>Update credit card</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CreditCardUser;
