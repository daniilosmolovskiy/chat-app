export const initialState = {
  roomId: '',
  userName: '',
  message: '',
  roomMessages: ['']
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      return {
        ...state,
        userName: action.payload
      };
    case 'ADD_ROOMID':
      return {
        ...state,
        roomId: action.payload
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        roomMessages: [...state.roomMessages, action.payload]
      };
    case 'CURRENT_MESSAGE':
      return {
        ...state,
        message: action.payload
      };
    case 'CLEAR_CURRENT_MESSAGE':
      return {
        ...state,
        message: ''
      };
    default:
      throw new Error();
  }
}