import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Menu from "./components/common/Menu";
import Error404 from "./components/common/Error404";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/(|home|configurations|registries|dashboard|account|logout)"
          render={props => <Menu {...props} />}
        />
        <Route path="*" render={Error404} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
