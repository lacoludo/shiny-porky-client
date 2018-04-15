import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Input, Item, Label, Text } from 'native-base';
import MessageView from './../../components/MessageView';
import SpacerView from './../../components/Spacer';
import ButtonView from './../../components/ButtonView';
import { signUp } from '../../actions/member';
import PorkyIcon from './../../images/porky-icon.png';

const styles = StyleSheet.create({
  margins: {
    marginTop: 56,
    marginBottom: 56,
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
                <Input placeholder='Prénom' onChangeText={v => this.handleChange('firstName', v)} />
              </Item>
              <Item>
                <Input placeholder='Nom' onChangeText={v => this.handleChange('lastName', v)} />
              </Item>
              <Item>
                <Input
                  placeholder='Email'
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Mot de passe'
                  secureTextEntry
                  onChangeText={v => this.handleChange('password', v)} />
              </Item>
              <Item>
                <Input
                  placeholder='Confirmez mot de passe'
                  secureTextEntry
                  onChangeText={v => this.handleChange('password2', v)} />
              </Item>
              <SpacerView size={20} />
              <ButtonView onPress={this.handleSubmit} label={'S\'inscrire'} isLoading={isLoading} />
              <SpacerView size={20} />
            </Form>
          </View>
          <View>
            <TouchableOpacity style={styles.layoutCenter} onPress={() => toggleAuthentication('login')}>
              <Text style={styles.colorGold}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
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
