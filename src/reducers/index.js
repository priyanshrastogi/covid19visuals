import { combineReducers } from 'redux';
import globalCovid from './globalCovid';
import countrywiseCovid from './countryCovid';
import countries from './countries';

export default combineReducers({
  globalCovid,
  countrywiseCovid,
  countries
});