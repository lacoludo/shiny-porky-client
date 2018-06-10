export const initialState = {
  token: null,
  number: null,
  expMonth: null,
  expYear: null,
  fullName: null,
  isLoading: false,
  error: null,
  success: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREDIT_CARD': {
      return { 
        ...state,
        isLoading :true,
        error: null,
        success: false,
      };
    }
    case 'CREDIT_CARD_SUCCESS': {
      return {
        error: null,
        isLoading: false,
        success: null,
        token: action.data.token || '',
        number: action.data.last4 || '',
        expMonth: action.data.exp_month || '',
        expYear: action.data.exp_year || '',
        fullName: action.data.fullName || '',
      };
    }
    case 'SAVE_CREDIT_CARD_SUCCESS': {
      return {
        ...state,
        error: null,
        isLoading: false,
        success: true,
      };
    }
    case 'CREDIT_CARD_ERROR': {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.data.error,
      };
    }
    case 'CREDIT_CARD_RESET_MESSAGE': {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
