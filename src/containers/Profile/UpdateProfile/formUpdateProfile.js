import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import ButtonView from './../../../components/ButtonView';
import SpacerView from './../../../components/Spacer';

class UpdateProfileForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.member.firstName || '',
      lastName: props.member.lastName || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
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
    const { member, isLoading } = this.props;
    return ( 
      <Form>
        <Item stackedLabel>
          <Label>Prénom</Label>
          <Input
            value={this.state.firstName}
            onChangeText={v => this.handleChange('firstName', v)}
          />
        </Item>

        <Item stackedLabel>
          <Label>Nom</Label>
          <Input
            value={this.state.lastName}
            onChangeText={v => this.handleChange('lastName', v)}
          />
        </Item>

        <ListItem>
          <CheckBox
            checked={this.state.changeEmail}
            onPress={() => this.handleChange('changeEmail', !this.state.changeEmail)}
          />
          <Body>
            <Text>Changer mon email</Text>
          </Body>
        </ListItem>

        {this.state.changeEmail &&
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={this.state.email}
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>
        }

        <ListItem>
          <CheckBox
            checked={this.state.changePassword}
            onPress={() => this.handleChange('changePassword', !this.state.changePassword)}
          />
          <Body>
            <Text>Modifier mots de passe</Text>
          </Body>
        </ListItem>

        {this.state.changePassword &&
          <View padder>
            <Item stackedLabel>
              <Label>Mots de passe</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel last>
              <Label>Répéter mots de passe</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>
          </View>
        }
        <SpacerView size={20} />
        <ButtonView onPress={this.submitForm} label={'Mettre à jour'} isLoading={isLoading} />
      </Form>
    )
  }
}

export default UpdateProfileForm;
