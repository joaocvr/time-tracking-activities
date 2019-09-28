export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const addedCategory = category => ({
  type: ADD_CATEGORY,
  payload: category
});

export const deletedCategory = id => ({
  type: DELETE_CATEGORY,
  payload: id
});

export const addCategory = category => dispatch => {
  dispatch(addedCategory(category));
};

export const deleteCategory = id => dispatch => {  
  dispatch(deletedCategory(id));
};
