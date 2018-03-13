var stripe = require('stripe-client')('pk_test_7lMCWcAX9YQNeP5uEuGTFGsv');
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { getMemberData } from './member';

/**
  * Update Profile
  */
export function createToken(formData) {
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
  return await stripe.createToken({ card: formData})
    .then(async (card) => {
    if (card.error) return reject({ message: card.error.message });

    updateCreditCard(dispatch, {        
      token: card.id,
      exp_month: card.card.exp_month,
      exp_year: card.card.exp_year,
      fullName: card.card.name,
      last4: card.card.last4,
    });

    }).catch(reject);
  }).catch(async (err) => { 
    await statusMessage(dispatch, 'error', err.message); throw err.message; 
  });
}

/**
  * Update Profile
  */
export function updateCreditCard(dispatch, formData) {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    FirebaseRef.child(`users/${UID}/creditCard`).set(formData);
}
    