import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MessageView from './../../components/MessageView';
import HeaderView from './../../components/HeaderView';
import SpacerView from './../../components/Spacer';
import ButtonView from './../../components/ButtonView';

import { resetPassword } from '../../actions/member';

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
        <HeaderView title="Réinitialiser votre mots de passe" />
        {error && <MessageView message={error} />}
        {success && <MessageView message={'Un email a été envoyé afin de réinitialiser votre mots de passe.'} />}
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
          <SpacerView size={20} />
          <ButtonView onPress={this.handleSubmit} label={'Réinitialiser'} isLoading={isLoading} />
        </Form>
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
