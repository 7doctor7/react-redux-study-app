import { alertConstants } from '../constants';

const { SUCCESS, ERROR, CLEAR } = alertConstants;

export function alert(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCCESS:
      return {
        type: 'alert-success',
        message: payload
      };
    case ERROR:
      return {
        type: 'alert-danger',
        message: payload
      };
    case CLEAR:
      return {};
    default:
      return state;
  }
}
