import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, List } from 'native-base';
import TransactionItem from './TransactionItem';

class TransactionsList extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  shouldComponentUpdate(nextProps) {
    return this.props.transactions !== nextProps.transactions;
  }

  render() {
    const { transactions } = this.props;
    if (transactions.length === 0) {
      return <Text>Il n'y a aucun transaction actuellement sur ce Porky.</Text>
    }

    return (
      <List>
        {transactions.map((transaction) => {
          return (<TransactionItem transaction={transaction} key={transaction.id} />)
        })}
      </List>
    );
  }
}

export default TransactionsList;
