export const initialState = {
  isLoading: false,
  isSaving: false,
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
      case 'LOAD_SHIPPING_ADDRESS_SUCCESS': {
        if (!action.data.shipping) {
          return {
            ...state,
            isLoading: false,
          }
        }
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
      case 'SAVE_SHIPPING_ADDRESS': {
        return {
          ...state,
          isSaving: true,
        };
      }
      case 'SAVE_SHIPPING_ADDRESS_SUCCESS': {
        return {
          ...state,
          isSaving: false,
        };
      }
      default:
        return state;
    }
  }
  