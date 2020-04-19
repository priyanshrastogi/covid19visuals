import axios from "axios";
import { getLatestGlobalData, getLatestCountrywiseData, getCountryIndex, getGlobalCovidTimeSeries, getGlobalCovidDailyDelta, getCountrywiseCovidTimeSeries, getCountrywiseCovidDailyDelta, getIndiaData } from "../helpers/transformData";
import { findFacts, findCountrywiseFacts, findFlatCurveCountries } from "../helpers/findFacts";

export const GET_GLOBAL_COVID_DATA = 'get_global_covid_data';
export const GET_COUNTRYWISE_COVID_DATA = 'get_cw_covid_data';
export const GET_COUNTRY_INDEX = 'get_country_index';
export const GET_GLOBAL_COVID_TIMESERIES_DATA = 'get_global_covid_ts_data';
export const GET_COUNTRYWISE_TIMESERIES_COVID_DATA = 'get_cw_covid_ts_data';
export const GET_GLOBAL_COVID_DELTA = 'get_global_covid_delta';
export const GET_COUNTRYWISE_COVID_DELTA = 'get_cw_covid_delta';
export const GET_INDIA_COVID_DATA = 'get_india_covid_data';
export const ADD_FACT = 'add_Fact';
export const GET_FLAT_CURVE_COUNTRIES = 'get_flat_curve_countries';

export const getGlobalData = () => async dispatch => {
  const mainData = await axios.get('https://pomber.github.io/covid19/timeseries.json');
  const globalData = getLatestGlobalData(mainData.data);
  dispatch({type: GET_GLOBAL_COVID_DATA, payload: globalData});
  const countryWiseData = getLatestCountrywiseData(mainData.data);
  dispatch({type: GET_COUNTRYWISE_COVID_DATA, payload: countryWiseData});
  const countryIndex = getCountryIndex(mainData.data);
  dispatch({type:GET_COUNTRY_INDEX, payload: countryIndex});
  const globalCovidTimeSeries = getGlobalCovidTimeSeries(mainData.data);
  dispatch({type:GET_GLOBAL_COVID_TIMESERIES_DATA, payload: globalCovidTimeSeries});
  const globalDailyDelta = getGlobalCovidDailyDelta(globalCovidTimeSeries);
  dispatch({type: GET_GLOBAL_COVID_DELTA, payload: globalDailyDelta});
  const countrywiseCovidTimeSeries = getCountrywiseCovidTimeSeries(mainData.data);
  dispatch({type:GET_COUNTRYWISE_TIMESERIES_COVID_DATA, payload: countrywiseCovidTimeSeries});
  const countrywiseDailyDelta = getCountrywiseCovidDailyDelta(countrywiseCovidTimeSeries);
  dispatch({type: GET_COUNTRYWISE_COVID_DELTA, payload: countrywiseDailyDelta});
  const globalFacts = findFacts(globalCovidTimeSeries, globalDailyDelta);
  dispatch({type: ADD_FACT, payload: {global: globalFacts}}); 
  const countrywiseFacts = findCountrywiseFacts(countrywiseCovidTimeSeries, countrywiseDailyDelta);
  dispatch({type: ADD_FACT, payload: countrywiseFacts});
  const flatcurvecountries = findFlatCurveCountries(countrywiseCovidTimeSeries);
  dispatch({type: ADD_FACT, payload: {curve: flatcurvecountries}});
}

export const getIndiaCovidData = () => async dispatch => {
  const indiaData = await axios.get('https://api.covid19india.org/data.json');
  const indiaCovidData = getIndiaData(indiaData.data);
  dispatch({type: GET_INDIA_COVID_DATA, payload: indiaCovidData});
  const indiaFacts = findFacts(indiaCovidData.timeseries, indiaCovidData.timeseriesDelta);
  dispatch({type: ADD_FACT, payload: {india: indiaFacts}}); 
}
