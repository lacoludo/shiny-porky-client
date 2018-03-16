import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

/**
  * Create user porky
  */
export function createPorky(formData) {

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?

    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.name });

    // Validation checks
    if (!name) return reject({ message: ErrorMessages.missingName });
    if (!childName) return reject({ message: ErrorMessages.missingChildName });
    const gramme = 0;
    // Go to Firebase
    FirebaseRef.child(`porkies/${UID}`).push({ name, childName, gramme })
    resolve();
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Set a favorite porky to authenticate user
  */
export function favoritePorky(id) {
  return dispatch => new Promise(async (resolve, reject) => {
    const UID = Firebase.auth().currentUser.uid;
    FirebaseRef.child(`users/${UID}`).update({ favoritePorky: id })
    resolve();
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get this User's Porkies
  */
export function call(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;
  const ref = FirebaseRef.child(`porkies/${UID}`);

  return ref.on('value', (snapshot) => {
    const porkies = snapshot.val() || [];

    return dispatch({
      type: 'PORKIES_REPLACE',
      data: porkies,
    });
  });
}

export function getUserPorkies() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(call(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
* Set an Error Message
*/
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'PORKIES_ERROR',
    data: message,
  })));
}

/**
  * Get this User's Favourite Porky
  */
export function getFavouritePorky(porkyId) {
  return dispatch => new Promise(async (resolve, reject) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const ref = FirebaseRef.child(`porkies/${user.uid}/${porkyId}`);
        
        return ref.on('value', (snapshot) => {
          const porky = snapshot.val() || [];
          return dispatch({
            type: 'FAVOURITE_PORKY_REPLACE',
            data: porky,
          });
        });
      }
    });
  });
}