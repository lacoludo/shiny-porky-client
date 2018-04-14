import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import MessageView from './../../../components/MessageView';
import HeaderView from './../../../components/HeaderView';
import CreditCardForm from './CreditCardForm';

import { createToken, getUserCreditCard } from '../../../actions/stripes';

class CreditCardUser extends Component {
  static propTypes = {
    createCard: PropTypes.func.isRequired,
    getUserCreditCard: PropTypes.func.isRequired,
    creditCard: PropTypes.shape({}).isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  componentDidMount() {
    this.props.getUserCreditCard();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.creditCard !== this.props.creditCard;
  }

  createCard = (formData) => {
    const { dispatch, member } = this.props;
    this.props.createCard(member.customerStripe, formData, dispatch);
  }

  render() {
    const { creditCard } = this.props;
    return ( 
      <Container>
        <Content padder>
          <HeaderView title="Informations bancaires" />
          {creditCard.error && <MessageView message={creditCard.error} />}
          {creditCard.success && <MessageView message={'Informations enregistrées !'} type={'success'}/>}
          <CreditCardForm creditCard={creditCard} onSubmitForm={this.createCard} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  creditCard: state.creditCard || null,
});

function mapDispatchToProps(dispatch) {
  return {
    createCard: (customer, formData, dispatch) => createToken(customer, formData, dispatch),
    getUserCreditCard: () => getUserCreditCard(dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardUser);
