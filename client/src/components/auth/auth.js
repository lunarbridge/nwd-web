import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Login, Logout } from "./components";

export const Auth = (props) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/login`} component={Login} />
      <Route path={`${match.path}/logout`}>
        <Logout />
      </Route>
    </Switch>
  )
}