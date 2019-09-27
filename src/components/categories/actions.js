export const ADD_CATEGORY = "ADD_CATEGORY";

export const addedCatefory = category => ({
  action: ADD_CATEGORY,
  payload: category
});

export const addCategory = category => dispatch => {
  dispatch(addedCatefory(category));
};
