
export const initialState = {
  isLoading: false,
  dataGold: [],
  currentGoldValue: 0,
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
      const currentGoldValue = (data[data.length - 1] * 5) / 28.349523;
      return {
        ...state,
        isLoading: false,
        dataGold: data,
        currentGoldValue: Math.round(currentGoldValue),
      };
    }
    default:
      return state;
  }
}
  