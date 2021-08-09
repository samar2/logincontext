import React, { useContext } from "react";
import SessionContext from "./session/SessionContext";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/admin/NotFound";
import Customers from "../pages/admin/Customers";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";

export default function Routes() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);

  return (
    <Switch>
      <PublicRoute
        path="/admin/login"
        component={Login}
        token={access_token}
        exact
      />
      <PrivateRoute
        path="/admin/dashboard"
        component={Dashboard}
        token={access_token}
        exact
      />
      <PrivateRoute
        path="/admin/customers"
        component={Customers}
        token={access_token}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function PublicRoute({ path, component: Component, token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        token ? <Redirect to="/admin/dashboard" /> : <Component {...props} />
      }
    />
  );
}

function PrivateRoute({ path, component: Component, token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
}
