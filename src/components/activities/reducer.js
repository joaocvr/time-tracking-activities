import { ADD_ACTIVITY } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const activity = action.payload;
      return { ...state, [activity.id]: { ...activity } };
    }

    default: {
      return state;
    }
  }
};
