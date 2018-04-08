export const initialState = {
    isLoading: false,
    messages: [],
  };
    
export default function appReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOAD_MESSAGES': {
    return {
        ...state,
        isLoading: true,
    };
  }
  case 'LOAD_MESSAGES_SUCCESS': {
    let messages = [];
    if (action.data && typeof action.data === 'object') {
      const data = action.data;
      messages = Object.keys(action.data).map((key, item) => ({
        id: key,
        content: data[key].content,
        date: data[key].date,
        hasSeen: data[key].hasSeen,
        porkyId: data[key].porky,
        transaction: data[key].transaction,
      }));
    } 

    return {
      isLoading: false,
      messages: messages,
    };
  }
  default:
    return state;
  }
}
    