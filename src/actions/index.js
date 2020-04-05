import axios from "axios";
import { getLatestGlobalData, getLatestCountrywiseData } from "../helpers/transformData";

export const GET_GLOBAL_COVID_DATA = 'get_global_covid_data';
export const GET_COUNTRYWISE_COVID_DATA = 'get_cw_covid_data';

/*
export const getGlobalData = () => async dispatch => {
  console.log("Getting data from API");
  const globalData = await axios.get('https://covidapi.info/api/v1/global');
  dispatch({type: GET_GLOBAL_COVID_DATA, payload: globalData.data});
  const countryWiseData = await axios.get('https://covidapi.info/api/v1/global/latest');
  dispatch({type: GET_COUNTRYWISE_COVID_DATA, payload: countryWiseData.data});
}
*/

export const getGlobalData = () => async dispatch => {
  console.log("Getting data from API");
  const mainData = await axios.get('https://pomber.github.io/covid19/timeseries.json');
  const globalData = getLatestGlobalData(mainData.data)
  //console.log(globalData);
  dispatch({type: GET_GLOBAL_COVID_DATA, payload: globalData});
  const countryWiseData = getLatestCountrywiseData(mainData.data);
  //console.log(countryWiseData);
  dispatch({type: GET_COUNTRYWISE_COVID_DATA, payload: countryWiseData});
}