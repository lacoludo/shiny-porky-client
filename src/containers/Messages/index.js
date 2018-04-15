import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, H3, Card, CardItem, Body, Text, List, Right } from 'native-base';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { updateMessage } from '../../actions/member';
import HeaderView from '../../components/HeaderView';
import MessageCard from './MessageCard';
import { TextCard, TextNoItems } from '../../components/styles/StyledText';

class Messages extends Component {
  static propType = {
    messages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateMessage: PropTypes.func.isRequired,
  }

  onPress = (notificationId) => {
    this.props.updateMessage(notificationId);
  }

  render() {
    const { isLoading, messages } = this.props;

    return (
      <Container>
        <Content padder>
          <HeaderView title="Mes Messages" />
          <View style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
            <TextCard>Shiny Porky envoit régulièrement des notifications sur tes Porkies ou le cours de l'or.</TextCard>
            <TextCard>Clique sur le message pour le faire disparaitre.</TextCard>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" style={{ height: 329}} />
          ) : (
            <List style={{ marginTop: 20 }}>
              {messages.length === 0 && <TextNoItems>Nous n'avez actuellement aucun message.</TextNoItems>}
              {messages.map((message) => {
                return (
                  <TouchableOpacity key={message.id} onPress={() => this.onPress(message.id)}>  
                    <MessageCard message={message} />
                  </TouchableOpacity>
                )
              })}
            </List>
          )}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
});

function mapDispatchToProps(dispatch) {
  return {
    updateMessage: (notificationId) => updateMessage(notificationId, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);