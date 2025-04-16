const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const GET_USER_EMAIL = 'GET_USER_EMAIL';

const initialState = {
  isLoggenIn: localStorage.getItem('token'),
  username: null,
  image: null,
  email: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLoggenIn: true };

    case LOG_OUT:
      return { ...state, isLoggenIn: false };

    case GET_USER:
      return { ...state, username: action.payload.profile.username, image: action.payload.profile.image };

    case GET_USER_EMAIL:
      return { ...state, email: action.payload };

    default:
      return state;
  }
};

export default loginReducer;
