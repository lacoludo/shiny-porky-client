import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions/member';
import { TouchableOpacity } from 'react-native';
import ButtonView from './../../components/ButtonView';
import MessageView from './../../components/MessageView';
import HeaderView from './../../components/HeaderView';
import SpacerView from './../../components/Spacer';

class Login extends Component {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };
  }

  handleSubmit = () => {
    this.props.login(this.state);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  render() {
    const { isLoading, error, toggleAuthentication } = this.props;

    return (
      <Content padder>
        <HeaderView title="Bienvenue" content="Please use your email and password to login." />
        {error && <MessageView message={error} />}
        <Form>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={this.state.email}
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={v => this.handleChange('password', v)}
            />
          </Item>
          <SpacerView size={20} />
          <ButtonView onPress={this.handleSubmit} label={'Se connection'} isLoading={isLoading} />
        </Form>
        <TouchableOpacity onPress={() => toggleAuthentication('signUp')}>
            <Text>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleAuthentication('forgotPassword')}>
            <Text>Mots de passe oublié</Text>
        </TouchableOpacity>
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.member.isLoading,
  error: state.member.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (formData) => login(formData, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
