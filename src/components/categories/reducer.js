import { ADD_CATEGORY, DELETE_CATEGORY } from "./actions";

export default (
  state = {
    Study: {
      id: "b0010d14-7a3c-446b-9059-797e9e7aa9ed"
    }
  },
  action
) => {
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
