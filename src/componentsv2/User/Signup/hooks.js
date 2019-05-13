import { useEffect } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { or } from "src/lib/fp";
import { useRedux } from "src/redux";

const mapStateToProps = {
  policy: sel.policy,
  loadingPolicy: sel.isApiRequestingPolicy,
  email: sel.email,
  loggedInAsEmail: sel.loggedInAsEmail,
  isAdmin: sel.isAdmin,
  newUserResponse: sel.newUserResponse,
  isApiRequestingLogin: sel.isApiRequestingLogin,
  isApiRequestingNewUser: or(
    sel.isApiRequestingInit,
    sel.isApiRequestingNewUser
  ),
  isApiRequestingVerifyNewUser: sel.isApiRequestingVerifyNewUser,
  apiNewUserError: sel.apiNewUserError,
  apiVerifyNewUserError: sel.apiVerifyNewUserError,
  isShowingSignupConfirmation: sel.isShowingSignupConfirmation,
  csrf: sel.csrf,
  isCMS: sel.isCMS
};

const mapDispatchToProps = {
  onGetPolicy: act.onGetPolicy,
  onSignup: act.onSignup,
  onSignupConfirm: act.onSignupConfirm,
  onResetSignup: act.onResetSignup
};

export function useSignup(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);

  useEffect(() => {
    if (!fromRedux.policy) {
      fromRedux.onGetPolicy();
    }
  }, []);

  return fromRedux;
}
