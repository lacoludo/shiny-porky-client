import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_FORGOT_PASSWORD':
    case 'USER_SIGN_UP':
    case 'USER_LOGIN': {
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };
    }
    case 'USER_FORGOT_PASSWORD_SUCCESS': 
    case 'USER_SIGN_UP_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
      return initialState;
    }
    case 'USER_LOGIN_SUCCESS': {
      if (action.data) {
        return {
          ...state,
          isLoading: true,
          error: null,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
        };
      }
      return initialState;
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          uid: action.uid,
          isLoading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
          customerStripe: action.data.customerStripe,
          reminderNotif: action.data.reminderNotif || 'never',
          creditCard: action.data.creditCard,
          favoritePorky: action.data.favoritePorky,
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          isLoading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET_MESSAGE': {
      return {
        ...state,
        isLoading: false,
        error: null,
        success: false,
      };
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
