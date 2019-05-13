import { useEffect } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";

const mapStateToProps = {
  policy: sel.policy,
  loadingPolicy: sel.isApiRequestingPolicy
};

const mapDispatchToProps = {
  onLogin: act.onLogin,
  onGetPolicy: act.onGetPolicy
};

export function useLogin(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);

  useEffect(() => {
    if (!fromRedux.policy) {
      fromRedux.onGetPolicy();
    }
  }, []);

  return fromRedux;
}
