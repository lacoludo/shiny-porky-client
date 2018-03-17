import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './../Messages';
import Loading from './../Loading';
import Header from './../Header';
import Spacer from './../Spacer';

class CreditCardUser extends React.Component {

  constructor(props) {
    super(props);

    const {creditCard} = props;
    this.state = {
      number: `************${props.creditCard.number}`,
      exp_month: props.creditCard.expMonth,
      exp_year: props.creditCard.expYear,
      name: props.creditCard.fullName,
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.props.member.customerStripe, this.state)
      .then(() => console.log('Profile Updated'))
      .catch(e => console.log(`Error: ${e}`));
  }
  
  render() {
    const { loading, error, success } = this.props;
    if (loading) return <Loading />;
    return (
      <Container>
        <Content padder>
          <Header title="Update credit card account" />
          {error && <Messages message={error} />}
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

            <Button block onPress={this.handleSubmit}>
              <Text>Update credit card</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CreditCardUser;
