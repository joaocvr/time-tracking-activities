import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuBar from "./components/menu/MenuBar";
import NavigationMenu from "./components/menu/NavigationMenu";

const App = () => (
  <BrowserRouter>
    <div>
      <MenuBar />
      <Switch>
        <Route exact path="/" render={props => <NavigationMenu {...props} />} />
        <Route path="/home" render={props => <NavigationMenu {...props} />} />
        <Route
          path="/activities"
          render={props => <NavigationMenu {...props} />}
        />
        <Route
          path="/dashboard"
          render={props => <NavigationMenu {...props} />}
        />
        <Route
          path="/account"
          render={props => <NavigationMenu {...props} />}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
