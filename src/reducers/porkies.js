import Store from '../store/porkies';

export const initialState = Store;

export default function porkieReducer(state = initialState, action) {
  switch (action.type) {
    case 'PORKIES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'PORKIES_REPLACE': {
      let porkies = [];
      if (action.data && typeof action.data === 'object') {
        const data = action.data;
        porkies = Object.keys(action.data).map((key, item) => ({
          id: key,
          name: data[key].name,
          childName: data[key].childName,
          gramme: data[key].gramme,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        porkies,
      };
    }
    default:
      return state;
  }
}
