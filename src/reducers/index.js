import status from './status';
import fontLoaded from './FontLoaded';
import member from './member';
import recipes from './recipes';
import porkies from './porkies';
import creditCard from './CreditCard';
import favouritePorky from './FavouritePorky';
import goldChart from './GoldChart';
import shippingAddress from './shippingAddress';
import notifications from './Notifications';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  fontLoaded,
  status,
  member,
  recipes,
  porkies,
  creditCard,
  favouritePorky,
  goldChart,
  shippingAddress,
  notifications,
};
