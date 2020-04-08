import axios from "axios";
import { getLatestGlobalData, getLatestCountrywiseData, getCountryIndex, getGlobalCovidTimeSeries, getGlobalCovidDailyDelta, getCountrywiseCovidTimeSeries, getCountrywiseCovidDailyDelta, getIndiaData } from "../helpers/transformData";
import { findGlobalFacts } from "../helpers/findFacts";

export const GET_GLOBAL_COVID_DATA = 'get_global_covid_data';
export const GET_COUNTRYWISE_COVID_DATA = 'get_cw_covid_data';
export const GET_COUNTRY_INDEX = 'get_country_index';
export const GET_GLOBAL_COVID_TIMESERIES_DATA = 'get_global_covid_ts_data';
export const GET_COUNTRYWISE_TIMESERIES_COVID_DATA = 'get_cw_covid_ts_data';
export const GET_GLOBAL_COVID_DELTA = 'get_global_covid_delta';
export const GET_COUNTRYWISE_COVID_DELTA = 'get_cw_covid_delta';
export const GET_INDIA_COVID_DATA = 'get_india_covid_data';
export const ADD_FACT = 'add_Fact';

export const getGlobalData = () => async dispatch => {
  console.log("Getting data from API");
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
  const globalFacts = findGlobalFacts(globalCovidTimeSeries, globalDailyDelta);
  dispatch({type: ADD_FACT, payload: {key: 'global', value: globalFacts}}); 
}

export const getIndiaCovidData = () => async dispatch => {
  const indiaData = await axios.get('https://api.covid19india.org/data.json');
  const indiaCovidData = getIndiaData(indiaData.data);
  dispatch({type: GET_INDIA_COVID_DATA, payload: indiaCovidData});
}
