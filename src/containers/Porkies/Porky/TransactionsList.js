import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Body, H1, List, ListItem, Text, Right } from 'native-base';
import { timestampToFormatFr } from '../../../utils/dateFormatter';
import { FontAwesomeMessageSuccess, FontAwesomeMessage } from '../../../components/styles/StyledText';

class TransactionsList extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { transactions } = this.props;
    if (transactions.length === 0) {
      return <Text>Il n'y a aucun transaction actuellement sur ce Porky.</Text>
    }

    return (
      <List>
        {transactions.map((transaction) => {
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
          )
        })}
      </List>
    );
  }
}

export default TransactionsList;
