import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { Container, Content, Body, H1, List, ListItem, Text, Right } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Error from '../../../native/components/Error';
import HeaderView from '../../../components/HeaderView';
import { getCurrentTransactionsByPorky } from '../../../actions/porkies';
import TransactionsList from './TransactionsList';
import { SubTitleText } from '../../../components/styles/StyledTitleView';
import { SubTitleView } from '../../../components/styles/StyledContainer';

class Porky extends Component {
  static propTypes = {
    error: PropTypes.string,
    porkyId: PropTypes.string.isRequired,
    porkies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    currentTransactions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    historicalTransactions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  componentDidMount() {
    this.props.getCurrentTransactionsByPorky(this.props.porkyId);
  }

  render() {
    const {
      error,
      porkies,
      porkyId,
      currentTransactions,
      historicalTransactions,
      isLoading,
    } = this.props;

    if (error) return <Error content={error} />;
    let porky = null;
  
    if (porkyId && porkies) {
      porky = porkies.find(item => item.id === porkyId );
    }
    if (!porky) return <Error content={ErrorMessages.recipe404} />;
    return (
      <Container>
        <Content style={{ marginRight: 15 }}>
          <HeaderView title={porky.name} />
          <SubTitleView>
            <SubTitleText>Transactions en cours</SubTitleText>
          </SubTitleView>
          {isLoading ?
            <ActivityIndicator size="large" color="#000" style={{ height: 329 }} />
            :
            <View>
              <TransactionsList transactions={currentTransactions} />
              <SubTitleView>
                <SubTitleText>Transactions Terminées</SubTitleText>
              </SubTitleView>
              <TransactionsList transactions={historicalTransactions} />
            </View>
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentTransactions: state.transactions.currentTransactions,
  historicalTransactions: state.transactions.historicalTransactions,
  isLoading: state.transactions.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentTransactionsByPorky: (porkyId) => getCurrentTransactionsByPorky(porkyId, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Porky);
