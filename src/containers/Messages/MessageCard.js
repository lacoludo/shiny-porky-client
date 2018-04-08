import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardItem, Body, Text } from 'native-base';

class MessageCard extends PureComponent {
  static propType = {
    message: PropTypes.shape({}).isRequired,
  }

  dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    return `Le ${date.toLocaleString('fr-FR')}`;
  }

  render() {
    const { message } = this.props;
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{message.content}</Text>
            <Text note>{this.dateFormat(message.date)}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default MessageCard;