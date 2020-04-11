import { ADD_FACT } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_FACT:
      const payload = action.payload;
      return {...state, ...payload}
    default:
      return state;
  }
}