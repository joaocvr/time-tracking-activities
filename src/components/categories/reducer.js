import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  BIND_ACTIVITY_TO_CATEGORY
} from "./actions";

const categories = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      return { ...state, [action.payload.id]: action.payload };
    }

    case DELETE_CATEGORY: {
      const categories = { ...state };
      delete categories[action.payload];
      return categories;
    }

    case BIND_ACTIVITY_TO_CATEGORY: {
      const { nameActivity, nameCategory } = action.payload;
      const { id } = Object.values(state).find(c => c.name === nameCategory);
      const oldCategory = state[id];
      return {
        ...categories,
        [id]: {
          ...oldCategory,
          activities: [...oldCategory.activities, nameActivity]
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default categories;
