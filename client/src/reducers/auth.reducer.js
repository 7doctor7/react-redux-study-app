import { userConstants } from '../constants';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = userConstants;
const user = JSON.parse(localStorage.getItem('User'));
const initialState = {
  isLogin: !!user,
  userInfo: user ? { ...user } : {}
};

export function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        userInfo: { ...payload }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        userInfo: {}
      };
    default:
      return state;
  }
}
