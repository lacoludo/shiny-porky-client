import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Icon, Input, Item, Text } from 'native-base';
import { login } from '../../actions/member';
import ButtonView from './../../components/ButtonView';
import MessageView from './../../components/MessageView';
import { TextLinkLogin } from '../../components/styles/StyledText';
import { SubTitleText } from '../../components/styles/StyledTitleView';
import Header from './Header';

const styles = StyleSheet.create({
  layoutCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

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
      <Content style={{ padding: 30 }}>
        {error && <MessageView message={error} />}
        <Header />
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <SubTitleText>Se connecter sur Shiny Porky</SubTitleText>
        </View>
        <Form style={{ marginBottom: 20 }}>
          <Item style={{ marginLeft: 0, marginBottom: 20 }}>
            <Icon active name='mail' />
            <Input
              placeholder='Email'
              placeholderTextColor="#b2b2b2"
              value={this.state.email}
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>
          <Item style={{ marginLeft: 0 }}>
            <Icon active name='lock' />
            <Input
              placeholder='Mots de passe'
              placeholderTextColor="#b2b2b2"
              secureTextEntry
              onChangeText={v => this.handleChange('password', v)}
            />
          </Item>
        </Form>
        <ButtonView onPress={this.handleSubmit} label={'Se connecter'} isLoading={isLoading} />
        <TouchableOpacity style={[styles.layoutCenter, { marginTop: 20 }]} onPress={() => toggleAuthentication('forgotPassword')}>
          <TextLinkLogin>Mots de passe oublié ?</TextLinkLogin>
        </TouchableOpacity>
        <TouchableOpacity style={styles.layoutCenter} onPress={() => toggleAuthentication('signUp')}>
          <TextLinkLogin>Vous voulez devenir riche ? S'inscrire</TextLinkLogin>
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
