import fetch from 'isomorphic-fetch';
import qs from 'querystring';

import { envConstants } from '../constants';
import { handleResponse } from '../helpers';

const ENV = process.env.NODE_ENV;
const reqData = envConstants[ENV];
const { API_URL } = reqData;

const createBody = data => {
  const body = {};
  const userData = JSON.parse(localStorage.getItem('User'));
  const { user } = userData;
  const { id, name } = user;

  if (data) {
    body.data = data;
  }

  body.authorID = id;
  body.authorName = name;

  return body;
};

const reqOptions = ({ method, data }) => {
  const options = {};

  const userData = JSON.parse(localStorage.getItem('User'));
  const { token } = userData;

  if (data) {
    options.body = qs.stringify(createBody(data));
  }

  options.method = method;
  options.headers = {
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  };

  return options;
};

export const apiCall = async ({ method, data, url }) =>
  fetch(`${API_URL}${url}`, reqOptions({ method, data }))
    .then(handleResponse)
    .then(resp => resp)
    .catch(err => {
      throw new Error(err);
    });
