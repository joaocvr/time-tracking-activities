import { ADD_CATEGORY, DELETE_CATEGORY } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const { id, name } = action.payload;
      return { ...state, [name]: { id } };

    case DELETE_CATEGORY:
      const category = action.payload;
      delete state[category];
      return { ...state };

    default:
      return state;
  }
};
