export const initialState = {
  isLoading: false,
  dataGold: [],
};
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_DATA_GOLD': {
        return {
            ...state,
            isLoading: true,
        };
      }
      case 'LOAD_DATA_GOLD_SUCCESS': {
        const { dataGold } = state;
        const data = [];
        action.data.map(item => {
          data.push(item[1]);
        });
        return {
          isLoading: false,
          dataGold: data,
        };
      }
      default:
        return state;
    }
  }
  