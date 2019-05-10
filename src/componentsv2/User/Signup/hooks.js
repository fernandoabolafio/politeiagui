import * as sel from "src/selectors";
import * as act from "src/actions";
import { or } from "src/lib/fp";
import { useRedux } from "src/redux";

const mapStateToProps = {
  email: sel.email,
  loggedInAsEmail: sel.loggedInAsEmail,
  isAdmin: sel.isAdmin,
  policy: sel.policy,
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
  onFetchData: act.onGetPolicy,
  onSignup: act.onSignup,
  onSignupConfirm: act.onSignupConfirm,
  onResetSignup: act.onResetSignup
};

export function useSignup(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);
  return fromRedux;
}
