import { combineReducers } from 'redux';
import globalCovid from './globalCovid';
import countrywiseCovid from './countryCovid';
import countries from './countries';
import globalCovidTimeSeries from './globalCovidTimeseries';
import countrywiseCovidTimeSeries from './countrywiseCovidTimeseries';
import globalCovidDailyDelta from './globalCovidDailyDelta';
import countrywiseCovidDailyDelta from './countrywiseCovidDailyDelta';
import indiaCovid from './indiaCovid';
import facts from './facts';

export default combineReducers({
  globalCovid,
  countrywiseCovid,
  countries,
  globalCovidTimeSeries,
  countrywiseCovidTimeSeries,
  globalCovidDailyDelta,
  countrywiseCovidDailyDelta,
  indiaCovid,
  facts
});