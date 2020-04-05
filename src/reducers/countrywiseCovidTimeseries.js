import { GET_GLOBAL_COVID_TREND_DATA } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_GLOBAL_COVID_TREND_DATA:
      return action.payload;
    default:
    return state;
  }
}