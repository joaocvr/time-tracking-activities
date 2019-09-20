import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import MiniDrawer from "./components/common/MiniDrawer";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/(|home|activities|dashboard|account|logout)"
          render={props => <MiniDrawer {...props} />}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
