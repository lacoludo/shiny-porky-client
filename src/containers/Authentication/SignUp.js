import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MessageView from './../../components/MessageView';
import HeaderView from './../../components/HeaderView';
import SpacerView from './../../components/Spacer';

import { signUp } from '../../actions/member';

class Login extends Component {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    infoMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  };

  static defaultProps = {
    infoMessage: null,
    errorMessage: null,
    successMessage: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => { this.props.toggleAuthentication() })
      .catch(e => console.log(`Error: ${e}`));
  }


  render() {
    const { loading, error, toggleAuthentication } = this.props;
    // Loading
    if (loading) return <Loading />;
    return (
      <Content padder>
        <HeaderView
          title="Inscrition"
          content="Tu veux devenir riche??? Allez rejoins nous et tente d'avoir un maximum de gold !!!"
        />
        {error && <MessageView message={error} />}
        <Form>
          <Item stackedLabel>
            <Label>First Name</Label>
            <Input onChangeText={v => this.handleChange('firstName', v)} />
          </Item>

          <Item stackedLabel>
            <Label>Last Name</Label>
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
            <Label>Password</Label>
            <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
          </Item>

          <Item stackedLabel>
            <Label>Confirm Password</Label>
            <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
          </Item>

          <SpacerView size={20} />

          <Button block onPress={this.handleSubmit}>
            <Text>Sign Up</Text>
          </Button>
        </Form>
        <TouchableOpacity onPress={toggleAuthentication}>
            <Text>Revenir au login</Text>
        </TouchableOpacity>
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
