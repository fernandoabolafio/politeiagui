import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";

const mapStateToProps = {
  loading: sel.isApiRequestingLogin,
  error: sel.apiLoginError
};

const mapDispatchToProps = {
  onLogin: act.onLogin
};

export function useLogin(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);
  return fromRedux;
}
