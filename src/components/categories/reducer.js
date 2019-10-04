import { ADD_CATEGORY, DELETE_CATEGORY } from "./actions";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];

    case DELETE_CATEGORY:
      return state.filter(c => c !== action.payload);

    default:
      return state;
  }
};
