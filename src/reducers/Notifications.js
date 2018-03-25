export const initialState = {
  isLoading: false,
  reminder: 'never',
  success: false,
  error: false,
};
    
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_REMINDER_NOTIF': {
        return {
          ...state,
          isLoading: true,
          error: false,
          success: false,
        };
      }
      case 'SET_REMINDER_NOTIF_SUCCESS': {
        return {
          ...state,
          isLoading: false,
          error: false,
          success: true,
        };
      }
      case 'RESET_NOTIFICATIONS': {
        return initialState;
      }
      default:
        return state;
    }
  }
    