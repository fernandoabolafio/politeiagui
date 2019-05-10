import React from "react";
import { Switch, Route } from "react-router-dom";

import PageUserLogin from "./User/Login";
import PageUserSignup from "./User/Signup";
import PageUserRequestResetPassword from "./User/RequestResetPassword";
import PageUserResetPassword from "./User/ResetPassword";
import PageUserRequestResendVerificationEmail from "./User/RequestResendVerificationEmail";
import PageProposalsPublicList from "./Proposals/PublicList";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={PageProposalsPublicList} />
    <Route path="/user/login" exact component={PageUserLogin} />
    <Route path="/user/signup" exact component={PageUserSignup} />
    <Route
      path="/user/request-reset-password"
      exact
      component={PageUserRequestResetPassword}
    />
    <Route
      path="/user/reset-password"
      exact
      component={PageUserResetPassword}
    />
    <Route
      path="/user/resend-verification-email"
      exact
      component={PageUserRequestResendVerificationEmail}
    />
  </Switch>
);

export default Routes;