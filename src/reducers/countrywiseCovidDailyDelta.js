import { GET_COUNTRYWISE_COVID_DELTA } from '../actions';

export default (state = [], action) => {
  switch(action.type) {
    case GET_COUNTRYWISE_COVID_DELTA:
      return action.payload;
    default:
    return state;
  }
}