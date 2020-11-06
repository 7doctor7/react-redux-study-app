/* eslint-disable node/no-deprecated-api */
/* eslint-disable no-buffer-constructor */
import qs from 'querystring';
import fetch from 'isomorphic-fetch';

import { envConstants } from '../constants';
import { handleResponse } from '../helpers';

const LOGIN_ENDPOINT = 'auth';
const ENV = process.env.NODE_ENV;
const reqData = envConstants[ENV];
const { API_URL, MASTER_KEY } = reqData;

const createReqOptions = ({ username, password }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64');
  const data = {
    access_token: `${MASTER_KEY}`
  };

  return {
    method: 'POST',
    headers: {
      Authorization: `Basic ${hash}`,
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    },
    body: qs.stringify(data)
  };
};

const doLogOut = async () => {
  return Promise.resolve(localStorage.removeItem('User'));
};

const doLogin = data =>
  fetch(`${API_URL}${LOGIN_ENDPOINT}`, createReqOptions({ ...data }))
    .then(handleResponse)
    .then(resp => {
      const { token, user } = resp;
      localStorage.setItem('User', JSON.stringify({ token, user }));
      return { token, user };
    });

export const loginService = {
  doLogin,
  doLogOut
};
