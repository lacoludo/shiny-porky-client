import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';

import { getFavouritePorky } from './porkies';
/**
  * Sign Up to Firebase
  */
export function signUp(formData, dispatch) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
  } = formData;

  console.log('dra');
  dispatch({ type: 'USER_SIGN_UP' });
  if(!email) return dispatch({type: 'USER_ERROR', data: 'Le champ Email doit être rempli.'});
  if(!password) return dispatch({type: 'USER_ERROR', data: 'Le champ Mots de passe doit être rempli.'});
  if(!password2) return dispatch({type: 'USER_ERROR', data: 'Le champ Répéter mots de passe doit être rempli.'});
  if(!firstName) return dispatch({type: 'USER_ERROR', data: 'Le champ Prénom doit être rempli.'});
  if(!lastName) return dispatch({type: 'USER_ERROR', data: 'Le champ Nom doit être rempli.'});
  if(password !== password2) return dispatch({type: 'USER_ERROR', data: 'Les mots de passe ne sont pas identiques.'});

  return Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const creditCard = {
        last4: null,
        fullName: null,
        exp_month: null,
        exp_year: null,
        token: null,
      }

      addStripeCustomer(email)
        .then((resp) => resp.json())
        .then((customer) => {
          const customerStripe = customer.id
          if (res && res.uid) {
            FirebaseRef.child(`users/${res.uid}`).set({
              customerStripe,
              creditCard,
              firstName,
              lastName,
              signedUp: Firebase.database.ServerValue.TIMESTAMP,
              lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
            }).then(() => dispatch({ type: 'USER_SIGN_UP_SUCCESS' }));
          }          
      });
    }).catch((resp) => { dispatch({ type: 'USER_ERROR', data: resp.message })});
}

export function addStripeCustomer(email) {   
  return fetch(`https://api.stripe.com/v1/customers?email=${email}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + 'rk_test_n9qMIQA8aHU83gJ22NDxR1RS'
    }
  });
}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);
  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];
    return dispatch({ type: 'USER_DETAILS_UPDATE', data: userData });
  });
}

export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData, dispatch) {
  const {
    email,
    password,
  } = formData;
    // Go to Firebase
  
  if(!email) return dispatch({type: 'USER_ERROR', data: 'Le champ Email doit être rempli.'});
  if(!password) return dispatch({type: 'USER_ERROR', data: 'Le champ mots de passe doit être rempli.'});

  dispatch({type: 'USER_LOGIN'});
  return Firebase.auth()
    .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res && res.uid) {
            FirebaseRef.child(`users/${res.uid}`).update({
              lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
            });
            if (res.emailVerified === false) {
              Firebase.auth().currentUser
                .sendEmailVerification()
                .catch(() => console.log('Verification email failed to send'));
            }
            dispatch({ type: 'USER_LOGIN_SUCCESS', data: res });
            getUserData(dispatch);
          }
        }).catch((resp) => { dispatch({ type: 'USER_ERROR', data: resp.message })});
    });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
