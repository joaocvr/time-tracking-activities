import { deleteActivities } from "../activities/actions";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const doAddCategory = category => ({
  type: ADD_CATEGORY,
  payload: category
});

export const doDeleteCategory = category => ({
  type: DELETE_CATEGORY,
  payload: category
});

export const addCategory = category => dispatch => {
  dispatch(doAddCategory(category));
};

export const deleteCategory = nameCategory => dispatch => {
  dispatch(doDeleteCategory(nameCategory));
  dispatch(deleteActivities(nameCategory));
};
