import { userConstants } from '../constants';
import { loginService, signUpService } from '../services';
import { alertActions as act } from './alert.actions';
import { history } from '../helpers';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = userConstants;

const request = user => ({ type: LOGIN_REQUEST, payload: { ...user } });
const success = user => ({ type: LOGIN_SUCCESS, payload: { ...user } });
const failure = error => ({ type: LOGIN_FAILURE, payload: { ...error } });

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    loginService.doLogin({ username, password }).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
        dispatch(act.error(error));
      }
    );
  };
}

function signup(name, username, password) {
  return dispatch => {
    signUpService.signUp({ name, username, password }).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
        dispatch(act.error(error));
      }
    );
  };
}

function logout() {
  loginService.doLogOut();
  return { type: LOGOUT, payload: {} };
}

export const userActions = {
  login,
  logout,
  signup
};
