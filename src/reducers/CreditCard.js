export const initialState = {
  token: null,
  number: null,
  expMonth: null,
  expYear: null,
  fullName: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREDIT_CARD_REPLACE': {

      return {
        token: action.data.id || '',
        number: action.data.last4 || '',
        expMonth: action.data.exp_month || '',
        expYear: action.data.exp_year || '',
        fullName: action.data.fullName || '',
      };
    }
    default:
      return state;
  }
}
