import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREDIT_CARD_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          number: action.data.last4,
          exp_month: action.data.exp_month,
          exp_year: action.data.exp_year,
          cvc: action.data.cvc,
          name: action.data.fullName,
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
