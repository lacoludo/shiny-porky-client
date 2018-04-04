import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import ButtonView from './../../../components/ButtonView';
import SpacerView from './../../../components/Spacer';
import { StyledLabelForm, StyledLabelCheckbox, StyledTextInput } from './../../../components/styles/StyledTextForm';

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
      <View>
        <View style={{padding: 10}}>
          <StyledLabelForm>Prénom</StyledLabelForm>
          <StyledTextInput
            placeholder="Votre prénom..."
            value={this.state.firstName}
            onChangeText={v => this.handleChange('firstName', v)}
          />
        </View>
        <View style={{padding: 10}}>
          <StyledLabelForm>Nom</StyledLabelForm>
          <StyledTextInput
            placeholder="Votre nom..."
            value={this.state.lastName}
            onChangeText={v => this.handleChange('firstName', v)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <CheckBox
            checked={this.state.changeEmail}
            onPress={() => this.handleChange('changeEmail', !this.state.changeEmail)}
          />
          <StyledLabelCheckbox>Modifier mon email</StyledLabelCheckbox>
        </View>
        {this.state.changeEmail &&
          <View style={{padding: 10}}>
            <StyledLabelForm>Email</StyledLabelForm>
            <StyledTextInput
              autoCapitalize="none"
              placeholder="Mon email..."
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={v => this.handleChange('email', v)}
            />
          </View>
        }
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <CheckBox
            checked={this.state.changePassword}
            onPress={() => this.handleChange('changePassword', !this.state.changePassword)}
          />
          <StyledLabelCheckbox>Modifier mots de passe</StyledLabelCheckbox>
        </View>
        {this.state.changePassword &&
          <View>
            <View style={{padding: 10}}>
              <StyledLabelForm>Mots de passe</StyledLabelForm>
              <StyledTextInput
                secureTextEntry
                placeholder="Votre mots de passe..."
                value={this.state.password}
                onChangeText={v => this.handleChange('password', v)}
              />
            </View>
            <View style={{padding: 10}}>
              <StyledLabelForm>Mots de passe</StyledLabelForm>
              <StyledTextInput
                secureTextEntry
                placeholder="Répéter mots de passe..."
                value={this.state.password2}
                onChangeText={v => this.handleChange('password2', v)}
              />
            </View>
          </View>
        }
        <SpacerView size={20} />
        <ButtonView onPress={this.submitForm} label={'Enregistrer'} isLoading={isLoading} />
      </View>
    )
  }
}

export default UpdateProfileForm;
