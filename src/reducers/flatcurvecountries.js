import { GET_FLAT_CURVE_COUNTRIES } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_FLAT_CURVE_COUNTRIES:
      return action.payload;
    default:
    return state;
  }
}