import React from "react";

import ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ActivityReducer from "./components/activities/reducer";
import CategoriesReducer from "./components/categories/reducer";
import RegistriesReducer from "./components/registries/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    activities: ActivityReducer,
    categories: CategoriesReducer,
    registries: RegistriesReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
