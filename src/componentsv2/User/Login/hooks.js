import { useEffect, useState } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";
import { loginValidationSchema } from "./validation";

const mapStateToProps = {
  policy: sel.policy,
  loadingPolicy: sel.isApiRequestingPolicy
};

const mapDispatchToProps = {
  onLogin: act.onLogin,
  onGetPolicy: act.onGetPolicy
};

export function useLogin(ownProps) {
  const [validationSchema, setValidationSchema] = useState(null);
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);

  useEffect(() => {
    if (!fromRedux.policy) {
      fromRedux.onGetPolicy();
    }
  }, []);

  useEffect(() => {
    if (fromRedux.policy) {
      const schema = loginValidationSchema(fromRedux.policy);
      setValidationSchema(schema);
    }
  }, [fromRedux.policy]);

  return { ...fromRedux, validationSchema };
}
