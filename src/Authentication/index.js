import React from "react";
import AuthenticationPage from "./AuthenticationPage";
import FormWrapper from "./FormWrapper";
import Login from "./Login";
import Signup from "./Signup";
import { RequestReset, ResetPassword } from "./ResetPassword";

export const LoginPage = () => (
  <AuthenticationPage>
    <Login FormWrapper={FormWrapper} />
  </AuthenticationPage>
);

export const SignupPage = () => (
  <AuthenticationPage>
    <Signup FormWrapper={FormWrapper} />
  </AuthenticationPage>
);

export const RequestResetPage = () => (
  <AuthenticationPage>
    <RequestReset FormWrapper={FormWrapper} />
  </AuthenticationPage>
);

export const ResetPasswordPage = () => (
  <AuthenticationPage>
    <ResetPassword FormWrapper={FormWrapper} />
  </AuthenticationPage>
);
