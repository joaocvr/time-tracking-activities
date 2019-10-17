import { ADD_ACTIVITY, DELETE_ACTIVITY, DELETE_ACTIVITIES } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const { id, category, name } = action.payload;
      const oldCategoryContent = state[category] ? { ...state[category] } : {};
      return {
        ...state,
        [category]: { ...oldCategoryContent, [name]: { id } }
      };
    }

    case DELETE_ACTIVITY: {
      const { activity, category } = action.payload;
      delete state[category][activity];
      return { ...state };
    }

    case DELETE_ACTIVITIES: {
      const activities = state;
      const nameCatogory = action.payload;
      delete activities[nameCatogory];
      return { ...activities };
    }

    default:
      return state;
  }
};
