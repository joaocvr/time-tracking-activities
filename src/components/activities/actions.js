export const ADD_ACTIVITY = "ADD_ACTIVITY";

const doAddActivity = activity => ({
  type: ADD_ACTIVITY,
  payload: activity
});

export const addActivity = activity => dispatch => {
  dispatch(doAddActivity(activity));
};
