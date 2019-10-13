import { ADD_REGISTRY } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REGISTRY:
      const registry = action.payload;
      return { ...state, [registry.id]: { ...registry } };

    default:
      return state;
  }
};
