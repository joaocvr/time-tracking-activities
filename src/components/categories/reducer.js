import { ADD_CATEGORY, DELETE_CATEGORY } from "./actions";

const initialState = {
  1: { id: 1, name: "Study", activities: ["React", "MBA"] },
  2: { id: 2, name: "Workout", activities: ["CrossFit"] },
  3: { id: 3, name: "Rest", activities: [] }
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      return { ...state, [action.payload.id]: action.payload };
    }

    case DELETE_CATEGORY: {
      const categories = { ...state };
      delete categories[action.payload];
      return categories;
    }

    default: {
      return state;
    }
  }
};

export default categories;
