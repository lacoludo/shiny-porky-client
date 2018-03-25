import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

/**
  * Create user porky
  */
export function createPorky(formData) {

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const {
      name,
      childName,
    } = formData;
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
export function favoritePorky(id, dispatch) {
    const UID = Firebase.auth().currentUser.uid;
    FirebaseRef.child(`users/${UID}`).update({ favoritePorky: id });
    getFavouritePorky(id, dispatch);
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

export function getUserPorkies(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  Firebase.auth().onAuthStateChanged((loggedIn) => {
    return call(dispatch);
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
  export function getFavouritePorky(porkyId, dispatch) {
    dispatch({ type: 'FAVOURITE_PORKY', data: null });
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const ref = FirebaseRef.child(`porkies/${user.uid}/${porkyId}`);
        return ref.on('value', (snapshot) => {
          const porky = snapshot.val();
          return dispatch({
            type: 'FAVOURITE_PORKY_SUCCESS',
            data: porky,
          });
        });
      }
    });
  }