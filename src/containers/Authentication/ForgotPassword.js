import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Icon, Input, Item, Text } from 'native-base';
import MessageView from './../../components/MessageView';
import SpacerView from './../../components/Spacer';
import ButtonView from './../../components/ButtonView';
import { resetPassword } from '../../actions/member';
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

class ForgotPassword extends Component {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    success: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
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
    const { error, success, toggleAuthentication, isLoading } = this.props;

    return (
      <Content padder>
        {error && <MessageView message={error} />}
        {success && <MessageView message={'Un email a été envoyé afin de réinitialiser votre mots de passe.'} />}
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
              <ButtonView onPress={this.handleSubmit} label={'Réinitialiser'} isLoading={isLoading} />
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
    )
  }
}

const mapStateToProps = state => ({
  member: state.member,
  isLoading: state.member.isLoading,
  error: state.member.error,
  success: state.member.success,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formData) => resetPassword(formData, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
