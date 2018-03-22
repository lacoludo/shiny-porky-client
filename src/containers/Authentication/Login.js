import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions/member';
import { TouchableOpacity } from 'react-native';
import MessageView from './../../components/MessageView';
import HeaderView from './../../components/HeaderView';
import SpacerView from './../../components/Spacer';

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
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  render() {
    const { loading, error, toggleAuthentication } = this.props;
    if (loading) return <Loading />;
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
          <Button block onPress={this.handleSubmit}>
            <Text>Login</Text>
          </Button>
        </Form>
        <TouchableOpacity onPress={toggleAuthentication}>
            <Text>S'inscrire</Text>
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
  onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
