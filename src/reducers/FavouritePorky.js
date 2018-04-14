import { levelGetter } from '../utils/levelGetter';

export const initialState = {
  id: null,
  name: null,
  childName: null,
  gramme: null,
  loading: false,
  level: 0,
};
  
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITE_PORKY': {
      return {
          ...state,
          loading: true,
      };
    }
    case 'FAVOURITE_PORKY_SUCCESS': {
      const porky = action.data;
      const transactions = porky.transactions;
      let gramme = 0;
      if (transactions) {
        const array = Object.keys(transactions).map((key, item) => ({
          id: key,
          gramme: transactions[key].gramme,
          status: transactions[key].status,
        }));
        array.filter((transaction) => transaction.status !== 'In progress').map((transaction) => {
          gramme += transaction.gramme;
        });
      }
      return {
        loading: false,
        id: action.id,
        name: porky.name,
        childName: porky.childName,
        gramme,
        level: levelGetter(gramme),
      };
    }
    default:
      return state;
  }
}
  