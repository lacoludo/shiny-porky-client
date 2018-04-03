export const initialState = {
  fontLoaded: false,
};
  
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'FONT_LOADED': {
      return { 
          ...state,
          fontLoaded: true,
      };
    }
    default:
      return state;
  }
}
  