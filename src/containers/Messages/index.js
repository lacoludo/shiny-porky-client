import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, H3, Card, CardItem, Body, Text, List, Right } from 'native-base';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { updateMessage } from '../../actions/member';

class Messages extends Component {
  static propType = {
    messages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateMessage: PropTypes.func.isRequired,
  }

  dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    return `Le ${date.toLocaleString('fr-FR')}`;
  }

  onPress = (notificationId) => {
    this.props.updateMessage(notificationId);
  }

  render() {
    const { isLoading, messages } = this.props;

    return (
      <Container>
        <Content padder>
          <H3>Mes messages</H3>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" style={{ height: 329}} />
          ) : (
            <List>
              {messages.map((message) => {
                return (
                  <TouchableOpacity onPress={() => this.onPress(message.id)}>  
                    <Card>
                      <CardItem>
                        <Body>
                          <Text>{message.content}</Text>
                          <Text note>{this.dateFormat(message.date)}</Text>
                        </Body>
                      </CardItem>
                    </Card>
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