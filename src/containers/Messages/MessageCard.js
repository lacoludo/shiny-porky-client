import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardItem, Body, Text, Icon, Right } from 'native-base';

import { FontAwesomeMessage } from '../../components/styles/StyledText';
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
          <FontAwesomeMessage></FontAwesomeMessage>
          <Body style={{ marginLeft: 10 }}>
            <Text>{message.content}</Text>
            <Text note>{timestampToFormatFr(message.date)}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default MessageCard;