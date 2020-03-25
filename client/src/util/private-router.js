// ref: https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146
import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "./auth";

export const PrivateRouter = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to ={{
          pathname: "/auth/login",
          state: { from: props.location }
        }}
        />
      )
    }
  />
);
