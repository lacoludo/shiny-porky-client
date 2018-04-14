import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Right } from 'native-base';
import { timestampToFormatFr } from '../../../utils/dateFormatter';
import { FontAwesomeMessageSuccess, FontAwesomeMessage } from '../../../components/styles/StyledText';

class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.shape().isRequired
  }

  shouldComponentUpdate(nextProps) {
    return this.props.transaction !== nextProps.transaction;
  }

  render() {
    const { transaction } = this.props;
    return (
      <ListItem key={transaction.id}>
        {transaction.status === 'Terminé' ?
          <FontAwesomeMessageSuccess></FontAwesomeMessageSuccess>
        :
          <FontAwesomeMessage></FontAwesomeMessage>
        }
        <Body>
          <Text>Achat de {transaction.gramme} grammes d'or.</Text>
          <Text note>{timestampToFormatFr(transaction.date)}</Text>
        </Body>
        <Right>
          <Text>{transaction.status}</Text>
        </Right>
      </ListItem>
    );
  }
}

export default TransactionItem;
