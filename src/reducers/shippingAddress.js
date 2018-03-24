export const initialState = {
  isLoading: false,
  address: {
    line1: '',
    line2: '',
    city: '',
    country: '',
    phone: '',
    postalCode: '',
  },
};
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_SHIPPING_ADDRESS': {
        return { 
          ...state,
          isLoading :true,
        };
      }
      case 'SHIPPING_ADDRESS_SUCCESS': {
        const { address } = action.data.shipping;
        return {
          ...state,
          isLoading: false,
          address: {
            line1: address.line1 || '',
            line2: address.line2 || '',
            city: address.city || '',
            country: address.country || '',
            phone: action.data.shipping.phone || '',
            postalCode: address.postal_code || '',
          },
        };
      }
      default:
        return state;
    }
  }
  