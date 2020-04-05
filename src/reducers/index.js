import { combineReducers } from 'redux';
import globalCovid from './globalCovid';
import countrywiseCovid from './countryCovid';

export default combineReducers({
  globalCovid,
  countrywiseCovid
});