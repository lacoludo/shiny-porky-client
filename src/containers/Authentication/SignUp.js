import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Input, Item, Label, Text } from 'native-base';
import MessageView from './../../components/MessageView';
import ButtonView from './../../components/ButtonView';
import { signUp } from '../../actions/member';
import { TextLinkLogin } from '../../components/styles/StyledText';
import { SubTitleText } from '../../components/styles/StyledTitleView';
import Header from './Header';

const styles = StyleSheet.create({
  layoutCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
});

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
      <Content style={{ padding: 30 }}>
        {error && <MessageView message={error} />}
        <Header />
        <View style={{ alignItems: 'center' }}>
          <SubTitleText>Créer un compte Shiny Porky</SubTitleText>
        </View>
        <Form style={{ marginBottom: 20 }}>
          <Item floatingLabel style={{ marginLeft: 0 }}>
            <Label style={{ width: 200 }}>Prénom</Label>
            <Input onChangeText={v => this.handleChange('firstName', v)} />
          </Item>
          <Item floatingLabel style={{ marginLeft: 0 }}>
            <Label style={{ width: 200 }}>Nom</Label>
            <Input onChangeText={v => this.handleChange('lastName', v)} />
          </Item>
          <Item floatingLabel style={{ marginLeft: 0 }}>
            <Label style={{ width: 200 }}>Email</Label>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>
          <Item floatingLabel style={{ marginLeft: 0 }}>
            <Label style={{ width: 200 }}>Mots de passe</Label>
            <Input
              secureTextEntry
              onChangeText={v => this.handleChange('password', v)}
            />
          </Item>
          <Item floatingLabel style={{ marginLeft: 0 }}>
            <Label style={{ width: 200 }}>Répéter mots de passe</Label>
            <Input
              secureTextEntry
              onChangeText={v => this.handleChange('password2', v)}
            />
          </Item>
        </Form>
        <ButtonView onPress={this.handleSubmit} label={'S\'inscrire'} isLoading={isLoading} />
        <TouchableOpacity style={[styles.layoutCenter, { marginTop: 20 }]} onPress={() => toggleAuthentication('login')}>
          <TextLinkLogin>Revenir à la page connexion</TextLinkLogin>
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
