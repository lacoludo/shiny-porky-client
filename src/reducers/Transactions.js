export const initialState = {
    isLoading: false,
    currentTransactions: [],
    historicalTransactions: [],
  };
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_TRANSACTIONS': {
        return { 
          ...state,
          isLoading :true,
        };
      }
      case 'LOAD_TRANSACTIONS_SUCCESS': {
        let currentTransactions = [];
        let historicalTransactions = [];
        const data = action.data;
        const array = Object.keys(action.data).map((key, item) => ({
          id: key,
          gramme: data[key].gramme,
          date: data[key].datetime,
          status: data[key].status,
        }));
        
        currentTransactions = array.filter((transaction) => transaction.status !== 'Terminé');
        historicalTransactions = array.filter((transaction) => transaction.status === 'Terminé');

        return {
          ...state,
          currentTransactions: currentTransactions.reverse(),
          historicalTransactions: historicalTransactions.reverse(),
          isLoading: false,
        };
      }
      case 'LOAD_TRANSACTIONS_ERROR': {
  
        return {
          ...state,
          isLoading: false,
          success: false,
          error: action.data.error,
        };
      }
      default:
        return state;
    }
  }
  