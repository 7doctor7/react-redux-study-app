import { combineReducers } from 'redux';

import { users } from './users.reducer';
import { modals } from './modals.reducer';
import { auth } from './auth.reducer';
import { alert } from './alert.reducer';
import { divisions } from './divisions.reducer';

const mainReducer = combineReducers({
  users,
  modals,
  auth,
  alert,
  divisions
});

export default mainReducer;
