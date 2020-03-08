import { combineReducers } from 'redux';

import person from './person/reducer';
import user from './user/reducer';

export default combineReducers({
  person,
  user,
});
