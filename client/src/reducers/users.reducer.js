import { userConstants } from '../constants';

const { GETALL_REQUEST, GETALL_SUCCESS, GETALL_FAILURE } = userConstants;
const initialState = {
  name: null,
  username: null,
  userID: null
};

export function users(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case GETALL_REQUEST:
      return {
        ...state
      };
    case GETALL_SUCCESS:
      return {
        ...state
      };
    case GETALL_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
