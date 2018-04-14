import Store from '../store/porkies';
import { levelGetter } from '../utils/levelGetter';

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
          transactions: data[key].transactions,
        }));
      }
      porkies.map((porky) => {
        let gramme = 0;
        if (porky.transactions) {
          const array = Object.keys(porky.transactions).map((key, item) => ({
            id: key,
            gramme: porky.transactions[key].gramme,
            status: porky.transactions[key].status,
          }));
          array.filter((transaction) => transaction.status !== 'In progress').map((transaction) => {
            gramme += transaction.gramme;
          });
        };
        porky.gramme = gramme;
        porky.level = levelGetter(gramme);
      });

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
