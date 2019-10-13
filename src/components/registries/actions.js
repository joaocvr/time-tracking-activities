export const ADD_REGISTRY = "ADD_REGISTRY";

export const addedRegistry = registry => ({
  type: ADD_REGISTRY,
  payload: registry
});

export const addRegistry = registry => dispatch => {
  dispatch(addedRegistry(registry));
};
