import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Config from "src/Config";
import { defaultLightTheme, useTheme, Container } from "pi-ui";
import Header from "src/componentsv2/Header";

import LoginPage from "src/pages/User/Login";
import SignupPage from "src/pages/User/Signup";
import RequestResetPasswordPage from "src/pages/User/RequestResetPassword";
import ResetPasswordPage from "src/pages/User/ResetPassword";

import { ReduxProvider } from "src/redux";
import Loader from "./Loader";

const Routes = () => (
  <Switch>
    <Route path="/" exact redirect="/login" />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignupPage} />
    <Route
      path="/request-reset-password"
      exact
      component={RequestResetPasswordPage}
    />
    <Route path="/reset-password" exact component={ResetPasswordPage} />
  </Switch>
);

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Config>
      <ReduxProvider>
        <Loader>
          <Container>
            <Header />
            <Router>
              <Routes />
            </Router>
          </Container>
        </Loader>
      </ReduxProvider>
    </Config>
  );
};

export default App;
