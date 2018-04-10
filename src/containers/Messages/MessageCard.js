import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardItem, Body, Text } from 'native-base';

import { timestampToFormatFr } from '../../utils/dateFormatter';

class MessageCard extends PureComponent {
  static propType = {
    message: PropTypes.shape({}).isRequired,
  }

  render() {
    const { message } = this.props;
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{message.content}</Text>
            <Text note>{timestampToFormatFr(message.date)}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default MessageCard;