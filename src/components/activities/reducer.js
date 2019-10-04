import { ADD_ACTIVITY, DELETE_ACTIVITY, DELETE_ACTIVITIES } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ACTIVITY:
      const { category, name } = action.payload;
      const oldCategoryContent = state[category] ? [...state[category]] : [];
      return {
        ...state,
        [category]: [...oldCategoryContent, name]
      };

    case DELETE_ACTIVITY: {
      const { nameCategory, nameActivity } = action.payload;
      const activities =
        state.nameCategory &&
        state.nameCategory.filter(a => a !== nameActivity);
      return { ...state, [nameCategory]: [...activities] };
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
