import { ADD_FACT } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_FACT:
      state[action.payload.key] = action.payload.value;
      return state;
    default:
    return state;
  }
}