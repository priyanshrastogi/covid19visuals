import { GET_COUNTRY_INDEX } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_COUNTRY_INDEX:
      return action.payload;
    default:
    return state;
  }
}