var stripe = require('stripe-client')('pk_test_7lMCWcAX9YQNeP5uEuGTFGsv');
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

/**
  * Update CreditCard
  */
export function createToken(customerId, formData, dispatch) {
  const {
    number,
    exp_month,
    exp_year,
    cvc,
    name,
  } = formData;
  const UID = Firebase.auth().currentUser.uid;
  dispatch({ type: 'CREDIT_CARD', data: null });
  if (!UID) dispatch({ type: 'CREDIT_CARD_ERROR', data: { error: 'User not found'} });
  if (!cvc) dispatch({ type: 'CREDIT_CARD_ERROR', data: { error: 'CVC is missing'} });
  
  fetch(`https://api.stripe.com/v1/customers/${customerId}/sources?source=tok_visa`,
  {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
    }
  })
  .then((resp) => resp.json())
  .then((creditCard) => {
    updateCreditCard(dispatch, creditCard);
    dispatch({
      type: 'CREDIT_CARD_SUCCESS',
      data: creditCard,
    });
  });
}


export function getUserCreditCard(dispatch) {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
    if (loggedIn) {
      const UID = Firebase.auth().currentUser.uid;
      if (!UID) return false;
      const ref = FirebaseRef.child(`users/${UID}/creditCard`);
    
      return ref.on('value', (snapshot) => {
        const userData = snapshot.val() || [];
        console.log(userData)
        return dispatch({
          type: 'CREDIT_CARD_SUCCESS',
          data: userData,
        });
      });
    }
    return () => new Promise(() => resolve());
  });
}

/**
  * Update Profile
  */
export function updateCreditCard(dispatch, creditCard) {
  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return reject({ message: ErrorMessages.missingFirstName });
  FirebaseRef.child(`users/${UID}/creditCard`).set({
    token: creditCard.id,
    last4: creditCard.last4,
    exp_year: creditCard.exp_year,
    exp_month: creditCard.exp_month,
  });
}

/**
  * Update Profile
  */
export function purchaseGold(token, customerStripe, gramme) {
  const amount = gramme * 100;
  const description = `${gramme}g of golds`;

  return dispatch => new Promise((resolve) => {
      return fetch(`https://api.stripe.com/v1/charges?source=${token}&customer=${customerStripe}&currency=eur&amount=${amount}&description=${description}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
        }
      }).then(function(response) {
        console.log(response);
      })
  });
}
    