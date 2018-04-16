var stripe = require('stripe-client')('pk_test_7lMCWcAX9YQNeP5uEuGTFGsv');
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { addTransactionToPorky } from './porkies';

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
    dispatch({ type: 'SAVE_CREDIT_CARD_SUCCESS', data: creditCard });
    setTimeout(() => dispatch({ type: 'CREDIT_CARD_RESET_MESSAGE' }), 4000);
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
        return dispatch({ type: 'CREDIT_CARD_SUCCESS', data: userData });
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
export function purchaseGold(token, porkyId, customerStripe, gramme, dispatch) {
  const amount = gramme * 100;
  const description = `${gramme}g of golds`;

  return fetch(`https://api.stripe.com/v1/charges?source=${token}&customer=${customerStripe}&currency=eur&amount=${amount}&description=${description}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
      }
  })
  .then((resp) => resp.json())
  .then((data) => {
    addTransactionToPorky(porkyId, data.id, gramme, dispatch);
  });
}

/**
  * Get stripe customer
  */
export function getCustomerStripe(customerStripe, dispatch) {
  dispatch({ type: 'LOAD_SHIPPING_ADDRESS'});
  return fetch(`https://api.stripe.com/v1/customers/${customerStripe}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
    }
  })
  .then((resp) => resp.json())
  .then((data) => {
    dispatch({ type: 'SHIPPING_ADDRESS_SUCCESS', data});
  });
}

/**
  * Get stripe customer
  */
  export function postShippingAddressToCustomer(customerStripe, formData, dispatch) {
    const {
      line1,
      line2,
      postalCode,
      city,
      country,
      phone,
    } = formData;
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS' });

    return fetch(`https://api.stripe.com/v1/customers/${customerStripe}?shipping[name]=Principal&shipping[address][line1]=${line1}`
      + `&shipping[address][line2]=${line2}`
      + `&shipping[address][city]=${city}`
      + `&shipping[address][postal_code]=${postalCode}`
      + `&shipping[address][country]=${country}`
      + `&shipping[phone]=${phone}`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
      }
    })
    .then((response) => {
      dispatch({ type: 'SAVE_SHIPPING_ADDRESS_SUCCESS'});
    });
  }
      