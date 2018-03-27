import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MessageView from './../../components/MessageView';
import HeaderView from './../../components/HeaderView';
import SpacerView from './../../components/Spacer';
import ButtonView from './../../components/ButtonView';
import { signUp } from '../../actions/member';

class Login extends Component {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state);
  }


  render() {
    const { isLoading, error, toggleAuthentication } = this.props;

    return (
      <Content padder>
        <HeaderView
          title="InscriPtion"
          content="Tu veux devenir riche??? Allez rejoins nous et tente d'avoir un maximum de gold !!!"
        />
        {error && <MessageView message={error} />}
        <Form>
          <Item stackedLabel>
            <Label>Prénom</Label>
            <Input onChangeText={v => this.handleChange('firstName', v)} />
          </Item>

          <Item stackedLabel>
            <Label>Nom</Label>
            <Input onChangeText={v => this.handleChange('lastName', v)} />
          </Item>

          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>

          <Item stackedLabel>
            <Label>Mots de passe</Label>
            <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
          </Item>

          <Item stackedLabel>
            <Label>Répéter mots de passe</Label>
            <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
          </Item>

          <SpacerView size={20} />
          <ButtonView onPress={this.handleSubmit} label={'S\'inscrire'} isLoading={isLoading} />
        </Form>
        <TouchableOpacity onPress={() => toggleAuthentication('login')}>
            <Text>Revenir à l'authentification</Text>
        </TouchableOpacity>
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  member: state.member,
  isLoading: state.member.isLoading,
  error: state.member.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formData) => signUp(formData, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
