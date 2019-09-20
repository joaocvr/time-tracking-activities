import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import MiniDrawer from "./components/common/MiniDrawer";
import Error404 from "./components/common/Error404";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/(|home|activities|dashboard|account|logout)"
          render={props => <MiniDrawer {...props} />}
        />
        <Route path="*" render={Error404} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
