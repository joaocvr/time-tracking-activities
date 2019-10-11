export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const DELETE_ACTIVITIES = "DELETE_ACTIVITIES";

const doAddActivity = nameActivity => ({
  type: ADD_ACTIVITY,
  payload: nameActivity
});

const doDeleteActivity = (activity, category) => ({
  type: DELETE_ACTIVITY,
  payload: { activity, category }
});

const doDeleteActivities = nameCategory => ({
  type: DELETE_ACTIVITIES,
  payload: nameCategory
});

export const addActivity = nameActivity => dispatch => {
  dispatch(doAddActivity(nameActivity));
};

export const deleteActivity = (activity, category) => dispatch => {
  dispatch(doDeleteActivity(activity, category));
};

export const deleteActivities = nameCategory => dispatch => {
  dispatch(doDeleteActivities(nameCategory));
};
