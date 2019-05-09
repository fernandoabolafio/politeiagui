import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Config from "src/Config";
import { defaultLightTheme, useTheme } from "pi-ui";
import {
  LoginPage,
  SignupPage,
  RequestResetPage,
  ResetPasswordPage
} from "src/Authentication";
import { ReduxProvider } from "src/redux";
import Loader from "./Loader";

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
      <ReduxProvider>
        <Loader>
          <Router>
            <Routes />
          </Router>
        </Loader>
      </ReduxProvider>
    </Config>
  );
};

export default App;
