import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../../../native/components/Messages';
import Loading from '../../../native/components/Loading';
import Spacer from '../../../native/components/Spacer';
import HeaderView from './../../../components/HeaderView';
import ButtonView from './../../../components/ButtonView';
import { createPorky } from '../../../actions/porkies';

class NewPorky extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    createPorky: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { childName: '', name: '' };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.isLoading !== nextProps.isLoading
      || this.props.error !== nextProps.error
      || this.props.success !== nextProps.success
      || this.props.createPorky !== nextProps.createPorky
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
    this.props.createPorky(this.state)
      .then(() => Actions.porkies())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { isLoading, error, success } = this.props;
    if (isLoading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <HeaderView title="Créer un Porky" />
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}
          <Form style={{ marginLeft: -15 }} >
            <Item stackedLabel>
              <Label>Nom du Porky</Label>
              <Input
                placeholder="Ex: Porky"
                placeholderTextColor="#b2b2b2"
                value={this.state.name}
                onChangeText={v => this.handleChange('name', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>A quel enfant appartient ce Porky?</Label>
              <Input
                placeholder="Ex: Corentin"
                placeholderTextColor="#b2b2b2"
                value={this.state.childName}
                onChangeText={v => this.handleChange('childName', v)}
              />
            </Item>
            <Spacer size={20} />
          </Form>
          <ButtonView onPress={this.handleSubmit} label='Créer le Porky'/>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
  error: state.status.error || null,
  success: state.status.success || null,
});

const mapDispatchToProps = {
  createPorky: createPorky,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPorky);
