import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './../Messages';
import Loading from './../Loading';
import Header from './../Header';
import Spacer from './../Spacer';

class NewPorky extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      childName: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.loading !== nextProps.loading
      || this.props.error !== nextProps.error
      || this.props.success !== nextProps.success
      || this.state.name !== nextState.name
      || this.state.childName !== nextState.childName);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.porkies())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, success } = this.props;
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Create a porky"
            content="You can create a porky for your children !"
          />

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
                value={this.state.name}
                onChangeText={v => this.handleChange('name', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Child Name</Label>
              <Input
                value={this.state.childName}
                onChangeText={v => this.handleChange('childName', v)}
              />
            </Item>
            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Create Porky</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default NewPorky;
