export const initialState = {
    id: null,
    name: null,
    childName: null,
    gramme: null,
    loading: false,
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
        return {
            ...state,
            loading: false,
            id: action.data.id,
            name: action.data.name,
            childName: action.data.childName,
            gramme: action.data.gramme,
        };
      }
      default:
        return state;
    }
  }
  