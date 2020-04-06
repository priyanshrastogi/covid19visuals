import { GET_COUNTRYWISE_TIMESERIES_COVID_DATA } from '../actions';

export default (state = [], action) => {
  switch(action.type) {
    case GET_COUNTRYWISE_TIMESERIES_COVID_DATA:
      return action.payload;
    default:
    return state;
  }
}