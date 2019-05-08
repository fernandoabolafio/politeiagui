import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Config from "./Config";
import { defaultLightTheme, useTheme } from "pi-ui";
import {
  LoginPage,
  SignupPage,
  RequestResetPage,
  ResetPasswordPage
} from "./Authentication";

const Routes = () => (
  <Switch>
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignupPage} />
    <Route path="/request-reset-password" exact component={RequestResetPage} />
    <Route path="/reset-password" exact component={ResetPasswordPage} />
  </Switch>
);

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Config>
      <Router>
        <Routes />
      </Router>
    </Config>
  );
};

export default App;
