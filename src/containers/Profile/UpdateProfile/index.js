import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import { updateProfile } from '../../../actions/member';
import { ActivityIndicator } from 'react-native';
import FormUpdateProfile from './formUpdateProfile';
import MessageView from './../../../components/MessageView';
import HeaderView from './../../../components/HeaderView';

class UpdateProfile extends Component {
  PropTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  };
      
  DefaultProps = {
    errorMessage: null,
    successMessage: null,
  };

  onSubmitForm = (formData) => {
    this.props.updateProfile(formData)
      .then(() => console.log('Profile Updated'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { member, isLoading, error, success } = this.props;
    return (
      <Container>
        <Content padder>
          <HeaderView title="Mettre à jour mon profil" />
          {error && <MessageView message={error} />}
          {success && <MessageView message={success} type="success" />}
          <FormUpdateProfile member={member} onSubmitForm={this.onSubmitForm} isLoading={isLoading} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  error: state.status.error || null,
  success: state.status.success || null,
});

const mapDispatchToProps = {
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
