import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content, Form, Icon, Input, Item, Text } from 'native-base';
import MessageView from './../../components/MessageView';
import ButtonView from './../../components/ButtonView';
import { resetPassword } from '../../actions/member';
import { TextLinkLogin, FontAwesomeForm } from '../../components/styles/StyledText';
import { SubTitleText } from '../../components/styles/StyledTitleView';
import Header from './Header';

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
    marginTop: 20,
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
      <Content style={{ padding: 30 }}>
        {error && <MessageView message={error} />}
        {success && <MessageView message={'Un email a été envoyé afin de réinitialiser votre mots de passe.'} />}
        <Header />
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <SubTitleText>Réinitialisation de mots de passe</SubTitleText>
        </View>
        <Form style={{ marginBottom: 20 }}>
          <Item style={{ marginLeft: 0 }}>
            <FontAwesomeForm></FontAwesomeForm>
            <Input
              style={{ marginLeft: 10 }}
              placeholder='Email'
              placeholderTextColor="#b2b2b2"
              value={this.state.email}
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>
        </Form>
        <ButtonView onPress={this.handleSubmit} label={'Réinitialiser'} isLoading={isLoading} />
        <TouchableOpacity style={styles.layoutCenter} onPress={() => toggleAuthentication('login')}>
          <TextLinkLogin>Revenir à la page connexion</TextLinkLogin>
        </TouchableOpacity>
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
