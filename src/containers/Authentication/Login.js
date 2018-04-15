import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Icon, Input, Item, Text } from 'native-base';
import { login } from '../../actions/member';
import ButtonView from './../../components/ButtonView';
import MessageView from './../../components/MessageView';
import SpacerView from './../../components/Spacer';
import PorkyIcon from './../../images/porky-icon.png';

const styles = StyleSheet.create({
  margins: {
    marginTop: 100,
    marginBottom: 100,
  },
  layoutCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorGold: {
    color: '#d4af37',
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
      <Content padder>
        {error && <MessageView message={error} />}
        <View>
          <View style={styles.margins}>
            <View style={styles.layoutCenter}>
              <Image source={PorkyIcon} />
            </View>
          </View>
          <View>
            <Form>
              <Item>
                <Icon active name='mail' />
                <Input
                  placeholder='Email'
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              <SpacerView size={20} />
              <Item>
                <Icon active name='lock' />
                <Input
                  placeholder='Mot de passe'
                  secureTextEntry
                  onChangeText={v => this.handleChange('password', v)}
                />
              </Item>
              <SpacerView size={20} />
              <ButtonView onPress={this.handleSubmit} label={'Se connecter'} isLoading={isLoading} />
              <SpacerView size={20} />
            </Form>
            <View>
              <TouchableOpacity style={styles.layoutCenter} onPress={() => toggleAuthentication('forgotPassword')}>
                <Text style={styles.colorGold}>Mots de passe oublié ?</Text>
              </TouchableOpacity>
              <SpacerView size={20} />
              <TouchableOpacity style={styles.layoutCenter} onPress={() => toggleAuthentication('signUp')}>
                <Text style={styles.colorGold}>Vous voulez devenir riche ? S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
