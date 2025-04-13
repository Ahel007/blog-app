const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';

const initialState = {
  isLoggenIn: localStorage.getItem('token'),
  username: null,
  image: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLoggenIn: true };

    case LOG_OUT:
      return { ...state, isLoggenIn: false };

    case GET_USER:
      return { ...state, username: action.payload.profile.username, image: action.payload.profile.image };

    default:
      return state;
  }
};

export default loginReducer;
