import qs from 'querystring';
import fetch from 'isomorphic-fetch';

import { envConstants } from '../constants';
import { handleResponse } from '../helpers';

const SIGN_ENDPOINT = 'users';
const ENV = process.env.NODE_ENV;
const reqData = envConstants[ENV];
const { API_URL, MASTER_KEY } = reqData;

const reqOptions = ({ name, username, password }) => ({
  method: 'POST',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  },
  body: qs.stringify({
    access_token: `${MASTER_KEY}`,
    password,
    name,
    email: username,
    role: 'user'
  })
});

const signUp = async data =>
  fetch(`${API_URL}${SIGN_ENDPOINT}`, reqOptions({ ...data }))
    .then(handleResponse)
    .then(res => {
      const { token, user } = res;
      localStorage.setItem('User', JSON.stringify({ token, user }));
      return { token, user };
    });

export const signUpService = {
  signUp
};
