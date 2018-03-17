var stripe = require('stripe-client')('pk_test_7lMCWcAX9YQNeP5uEuGTFGsv');
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

/**
  * Update Profile
  */
export function createToken(customerId, formData) {
  const {
    number,
    exp_month,
    exp_year,
    cvc,
    name,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });
    if (!cvc) return reject({ message: ErrorMessages.missingCVC });
    await statusMessage(dispatch, 'loading', true);
    return fetch(`https://api.stripe.com/v1/customers/${customerId}/sources?source=tok_visa`,
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
        console.log(creditCard);
        updateCreditCard(dispatch, creditCard);
        return dispatch({
          type: 'CREDIT_CARD_REPLACE',
          data: creditCard,
        });
      }).then(() => statusMessage(dispatch, 'loading', false).then(resolve))
    });
}


export function getUserCreditCard() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        const UID = Firebase.auth().currentUser.uid;
        if (!UID) return false;
      
        const ref = FirebaseRef.child(`users/${UID}/creditCard`);
      
        return ref.on('value', (snapshot) => {
          const userData = snapshot.val() || [];
          return dispatch({
            type: 'CREDIT_CARD_REPLACE',
            data: userData,
          });
        });
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Update Profile
  */
export function updateCreditCard(dispatch, creditCard) {
  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return reject({ message: ErrorMessages.missingFirstName });
  console
  FirebaseRef.child(`users/${UID}/creditCard`).set({
    token: creditCard.id,
    full_name: creditCard.name,
    last4: creditCard.last4,
    exp_year: creditCard.exp_year,
    exp_month: creditCard.exp_month,
  });
}

/**
  * Update Profile
  */
export function purchaseGold(token, customerStripe, gramme) {
  console.log(gramme);
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
    